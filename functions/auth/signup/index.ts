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
    if (req.method !== "POST") {
      context.res = { 
        status: 405, 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Method not allowed" })
      };
      return;
    }

    const { email, firstName, lastName, password, phone, smsNotifications, promoCode } = req.body;

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      context.res = {
        status: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Email, password, firstName, and lastName are required" }),
      };
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      context.res = {
        status: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Invalid email format" }),
      };
      return;
    }

    // Validate password length
    if (password.length < 8) {
      context.res = {
        status: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Password must be at least 8 characters" }),
      };
      return;
    }

    // Check if user already exists
    const existingUser = await executeQuery(
      "SELECT id FROM users WHERE email = $1",
      [email.toLowerCase()]
    );

    if (existingUser && existingUser.length > 0) {
      context.res = { 
        status: 409, 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Email already registered" })
      };
      return;
    }

    // Determine role: admin if email is admin@pamperpro.eu, otherwise client
    const role = email.toLowerCase() === "admin@pamperpro.eu" ? "admin" : "client";

    // Hash password
    const passwordHash = hashPassword(password);

    // Generate verification token (6 character alphanumeric code)
    const verificationToken = generateVerificationToken();

    // Create user
    const createUserResult = await executeQuery(
      `INSERT INTO users (
        email, 
        password_hash, 
        first_name, 
        last_name, 
        phone,
        sms_notifications,
        promo_code,
        role, 
        roles,
        email_verified, 
        verification_token,
        verification_token_expires
      ) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, false, $10, $11) 
       RETURNING id, email, first_name, last_name, phone, sms_notifications, promo_code, role, roles, email_verified, created_at`,
      [
        email.toLowerCase(),
        passwordHash,
        firstName,
        lastName,
        phone || null,
        smsNotifications === true || smsNotifications === "true" ? true : false,
        promoCode || null,
        role,
        JSON.stringify([role]),
        verificationToken,
        new Date(Date.now() + 24 * 60 * 60 * 1000)
      ]
    );

    const user = createUserResult[0];

    if (!user) {
      context.res = { 
        status: 500, 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Failed to create user" })
      };
      return;
    }

    // Send verification email via Azure SendGrid
    const baseUrl = process.env.CLIENT_BASE_URL || "https://www.pamperpro.eu";
    const emailSent = await sendVerificationEmail(
      email,
      verificationToken,
      `${baseUrl}/verify-email?code=${verificationToken}`
    );

    if (!emailSent) {
      console.warn("Email failed to send, but user was created:", email);
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || "your-secret-key-change-in-production";
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        verified: false
      },
      jwtSecret,
      { expiresIn: "7d" }
    );

    context.res = {
      status: 201,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        message: "Account created. Please check your email to verify.",
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          phone: user.phone,
          smsNotifications: user.sms_notifications,
          promoCode: user.promo_code,
          role: user.role,
          roles: JSON.parse(user.roles || "[]"),
          isEmailVerified: false,
          created_at: user.created_at
        },
        emailSent
      })
    };
  } catch (error) {
    console.error("Signup error:", error);
    console.error("Error stack:", error instanceof Error ? error.stack : 'No stack');
    context.res = {
      status: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: false,
        error: "Signup failed",
        details: error instanceof Error ? error.message : String(error)
      })
    };
  }
};

export default httpTrigger;
