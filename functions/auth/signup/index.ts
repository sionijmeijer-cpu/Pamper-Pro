import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { executeQuery } from "../../lib/azureDbClient";
import { hashPassword } from "../../lib/passwordUtils";
import {
  generateVerificationToken,
  sendVerificationEmail,
} from "../../lib/emailService";
import * as jwt from "jsonwebtoken";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    // 1. Allow GET and POST (anything else is 405)
    if (req.method !== "POST" && req.method !== "GET") {
      context.res = {
        status: 405,
        headers: { "Content-Type": "application/json" },
        body: { error: "Method not allowed" },
      };
      return;
    }

    // 2. Read data from body (POST) or query (GET)
    const src: any = req.body || req.query || {};

    const email: string = (src.email || "").toString().toLowerCase();
    const password: string | undefined = src.password;
    const firstName: string | undefined = src.firstName;
    const lastName: string | undefined = src.lastName;

    // 3. Validate required fields
    if (!email || !password || !firstName || !lastName) {
      context.res = {
        status: 400,
        headers: { "Content-Type": "application/json" },
        body: {
          error: "Email, password, firstName, and lastName are required",
        },
      };
      return;
    }

    // 4. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      context.res = {
        status: 400,
        headers: { "Content-Type": "application/json" },
        body: { error: "Invalid email format" },
      };
      return;
    }

    // 5. Validate password length
    if (password.length < 8) {
      context.res = {
        status: 400,
        headers: { "Content-Type": "application/json" },
        body: { error: "Password must be at least 8 characters" },
      };
      return;
    }

    // 6. Check if user already exists
    const existingUser = await executeQuery(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser && existingUser.length > 0) {
      context.res = {
        status: 409,
        headers: { "Content-Type": "application/json" },
        body: { error: "Email already registered" },
      };
      return;
    }

    // 7. Determine role
    const role = email === "admin@pamperpro.eu" ? "admin" : "client";

    // 8. Hash password
    const passwordHash = hashPassword(password);

    // 9. Generate verification token
    const verificationToken = generateVerificationToken();

    // 10. Create user in DB
    const createUserResult = await executeQuery(
      `INSERT INTO users (
        email, 
        password_hash, 
        first_name, 
        last_name, 
        role, 
        roles,
        email_verified, 
        verification_token,
        verification_token_expires
      ) 
       VALUES ($1, $2, $3, $4, $5, $6, false, $7, $8) 
       RETURNING id, email, first_name, last_name, role, roles, email_verified, created_at`,
      [
        email,
        passwordHash,
        firstName,
        lastName,
        role,
        JSON.stringify([role]),
        verificationToken,
        new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h expiry
      ]
    );

    const user = createUserResult[0];

    if (!user) {
      context.res = {
        status: 500,
        headers: { "Content-Type": "application/json" },
        body: { error: "Failed to create user" },
      };
      return;
    }

    // 11. Send verification email
    const baseUrl = process.env.CLIENT_BASE_URL || "https://www.pamperpro.eu";
    const emailSent = await sendVerificationEmail(
      email,
      verificationToken,
      `${baseUrl}/verify-email?code=${verificationToken}`
    );

    if (!emailSent) {
      context.log.warn("Email failed to send, but user was created:", email);
    }

    // 12. Generate JWT
    const jwtSecret =
      process.env.JWT_SECRET || "your-secret-key-change-in-production";
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        verified: false,
      },
      jwtSecret,
      { expiresIn: "7d" }
    );

    // 13. Return JSON response
    context.res = {
      status: 201,
      headers: { "Content-Type": "application/json" },
      body: {
        success: true,
        message: "Account created. Please check your email to verify.",
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
          roles: JSON.parse(user.roles || "[]"),
          isEmailVerified: user.email_verified,
          created_at: user.created_at,
        },
        emailSent,
      },
    };
  } catch (error: any) {
    context.log.error("Signup error:", error);
    context.res = {
      status: 500,
      headers: { "Content-Type": "application/json" },
      body: {
        error: "Signup failed",
        details: error?.message ?? String(error),
      },
    };
  }
};

export default httpTrigger;

