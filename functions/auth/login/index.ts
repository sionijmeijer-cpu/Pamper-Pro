import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { executeQuery } from "../../lib/azureDbClient";
import { verifyPassword } from "../../lib/passwordUtils";
import * as jwt from "jsonwebtoken";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    if (req.method !== "POST") {
      context.res = { 
        status: 405, 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Method not allowed" })
      };
      return;
    }

    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      context.res = {
        status: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Email and password are required" })
      };
      return;
    }

    // Find user with correct column names
    const userResult = await executeQuery(
      `SELECT 
        id, 
        email, 
        "firstName", 
        "lastName",
        password, 
        role,
        "isVerified",
        "profileImage",
        bio,
        phone,
        "isActive"
       FROM users WHERE email = $1`,
      [email.toLowerCase()]
    );

    if (!userResult || userResult.length === 0) {
      context.res = {
        status: 401,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Invalid email or password" })
      };
      return;
    }

    const user = userResult[0];

    // Check if account is active
    if (user.isActive === 'false' || user.isActive === false) {
      context.res = {
        status: 403,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Account is disabled" })
      };
      return;
    }

    // Verify password
    if (!user.password || !verifyPassword(password, user.password)) {
      context.res = {
        status: 401,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Invalid email or password" })
      };
      return;
    }

    // Update last login
    await executeQuery(
      'UPDATE users SET "lastLogin" = $1 WHERE id = $2',
      [new Date(), user.id]
    );

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || "your-secret-key-change-in-production";
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        verified: user.isVerified === 'true' || user.isVerified === true
      },
      jwtSecret,
      { expiresIn: "7d" }
    );

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isEmailVerified: user.isVerified === 'true' || user.isVerified === true,
          profileImage: user.profileImage,
          bio: user.bio,
          phoneNumber: user.phone
        }
      })
    };
  } catch (error) {
    console.error("Login error:", error);
    context.res = {
      status: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Login failed",
        details: error instanceof Error ? error.message : String(error)
      })
    };
  }
};

export default httpTrigger;
