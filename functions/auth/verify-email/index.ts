import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { executeQuery } from "../../lib/azureDbClient";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    // Accept token from either query string or POST body
    const token = (req.body?.token || req.query?.token || "").toString();

    if (!token) {
      context.res = { status: 400, body: { error: "Token is required" } };
      return;
    }

    // Find user by verification token
    const userResult = await executeQuery(
      `SELECT 
        id, 
        email, 
        first_name, 
        last_name,
        role,
        roles,
        verification_token_expires 
       FROM users 
       WHERE verification_token = $1`,
      [token]
    );

    if (!userResult || userResult.length === 0) {
      context.res = { status: 404, body: { error: "Invalid or expired token" } };
      return;
    }

    const user = userResult[0];

    // Check if token expired
    if (user.verification_token_expires && new Date(user.verification_token_expires) < new Date()) {
      context.res = { status: 400, body: { error: "Token expired. Please request a new verification email." } };
      return;
    }

    // Mark user as verified
    await executeQuery(
      `UPDATE users 
       SET email_verified = true, 
           verification_token = NULL,
           verification_token_expires = NULL,
           updated_at = NOW()
       WHERE id = $1`,
      [user.id]
    );

    // Parse roles array
    const rolesArray = user.roles ? JSON.parse(user.roles) : [user.role];

    context.res = {
      status: 200,
      body: {
        success: true,
        message: "Email verified successfully",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
          roles: rolesArray,
          isEmailVerified: true
        }
      }
    };
  } catch (error) {
    console.error("Email verification error:", error);
    context.res = {
      status: 500,
      body: {
        error: "Email verification failed",
        details: error instanceof Error ? error.message : String(error)
      }
    };
  }
};

export default httpTrigger;
