import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { executeQuery } from "../../lib/azureDbClient";
import axios from "axios";

interface GoogleTokenPayload {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  iat: number;
  exp: number;
  picture?: string;
  name?: string;
}

/**
 * Verify Google ID token using Google's public certs
 */
async function verifyGoogleToken(token: string): Promise<GoogleTokenPayload | null> {
  try {
    // Get Google's public certificates
    const certResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v1/certs"
    );
    const certs = certResponse.data;

    // Decode token header to get kid
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid token format");
    }

    const header = JSON.parse(
      Buffer.from(parts[0], "base64").toString("utf-8")
    );
    const payload = JSON.parse(
      Buffer.from(parts[1], "base64").toString("utf-8")
    );

    // Verify token signature using Google's certificate
    const crypto = await import("crypto");
    const verifier = crypto.createVerify("RSA-SHA256");

    const cert = certs[header.kid];
    if (!cert) {
      throw new Error("Certificate not found");
    }

    verifier.update(`${parts[0]}.${parts[1]}`);
    const isValid = verifier.verify(cert, Buffer.from(parts[2], "base64"));

    if (!isValid) {
      return null;
    }

    // Verify token expiration
    if (payload.exp < Date.now() / 1000) {
      return null;
    }

    return payload as GoogleTokenPayload;
  } catch (error) {
    console.error("Google token verification error:", error);
    return null;
  }
}

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    if (req.method !== "POST") {
      context.res = { status: 405, body: { error: "Method not allowed" } };
      return;
    }

    const { credential } = req.body; // Google ID token

    if (!credential) {
      context.res = { status: 400, body: { error: "Token is required" } };
      return;
    }

    // Verify Google token
    const payload = await verifyGoogleToken(credential);

    if (!payload || !payload.email_verified) {
      context.res = { status: 401, body: { error: "Invalid or unverified token" } };
      return;
    }

    const { sub, email, name, picture } = payload;

    // Check if user exists by email
    const existingUser = await executeQuery(
      `SELECT id, email, name, picture_url, role, google_sub FROM users 
       WHERE email = $1`,
      [email]
    );

    let user;

    if (existingUser && existingUser.length > 0) {
      // User exists, update google_sub if not already set
      user = existingUser[0];
      if (!user.google_sub) {
        await executeQuery(
          `UPDATE users SET google_sub = $1, updated_at = now() 
           WHERE id = $2`,
          [sub, user.id]
        );
      }
    } else {
      // Create new user
      const createResult = await executeQuery(
        `INSERT INTO users (email, google_sub, name, picture_url, role, email_verified) 
         VALUES ($1, $2, $3, $4, 'client', true) 
         RETURNING id, email, name, picture_url, role, google_sub`,
        [email, sub, name || null, picture || null]
      );

      user = createResult[0];
    }

    context.res = {
      status: 200,
      body: {
        success: true,
        message: "Google authentication successful",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          picture_url: user.picture_url,
          role: user.role,
          email_verified: true,
        },
      },
    };
  } catch (error) {
    console.error("Google auth error:", error);
    context.res = {
      status: 500,
      body: {
        error: "Google authentication failed",
        details: error instanceof Error ? error.message : String(error),
      },
    };
  }
};

export default httpTrigger;
