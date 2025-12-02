import axios from "axios";
import { randomBytes } from "crypto";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
}

/**
 * Generate a secure email verification token
 */
export function generateVerificationToken(): string {
  return randomBytes(32).toString("hex");
}

/**
 * Send email using SendGrid or log to console in dev mode
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const sendGridApiKey = process.env.SENDGRID_API_KEY;
  const emailFrom = process.env.EMAIL_FROM || "noreply@pamperpro.eu";

  console.log("[EMAIL SERVICE] Checking SendGrid API Key...");
  console.log("[EMAIL SERVICE] SENDGRID_API_KEY exists:", !!sendGridApiKey);
  console.log("[EMAIL SERVICE] SENDGRID_API_KEY length:", sendGridApiKey ? sendGridApiKey.length : 0);
  console.log("[EMAIL SERVICE] All env vars:", Object.keys(process.env).filter(k => k.includes('SEND') || k.includes('EMAIL') || k.includes('API')));

  if (!sendGridApiKey) {
    console.warn(
      "[DEV MODE] Email not sent (SENDGRID_API_KEY not configured):"
    );
    console.warn("To:", options.to);
    console.warn("Subject:", options.subject);
    console.warn("Body:", options.html);
    return true; // Return success for dev mode
  }

  try {
    const response = await axios.post(
      "https://api.sendgrid.com/v3/mail/send",
      {
        personalizations: [
          {
            to: [{ email: options.to }],
          },
        ],
        from: { email: emailFrom },
        subject: options.subject,
        content: [
          {
            type: "text/html",
            value: options.html,
          },
          {
            type: "text/plain",
            value: options.text,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${sendGridApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("[EMAIL SERVICE] Email sent successfully:", response.status);
    return true;
  } catch (error) {
    console.error("[EMAIL SERVICE] Failed to send email:", error);
    if (error instanceof Error) {
      console.error("[EMAIL SERVICE] Error message:", error.message);
    }
    return false;
  }
}

/**
 * Send email verification email
 */
export async function sendVerificationEmail(
  to: string,
  token: string,
  baseUrl: string = "https://www.pamperpro.eu"
): Promise<boolean> {
  const verificationUrl = `${baseUrl}/verify-email?token=${token}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f5f5f5; padding: 20px; text-align: center; border-radius: 5px; }
          .content { padding: 20px; }
          .button { display: inline-block; padding: 12px 24px; background-color: #8B5CF6; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { color: #999; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Verify Your Email</h1>
          </div>
          <div class="content">
            <p>Hi,</p>
            <p>Thank you for creating an account with Pamper Pro. To get started, please verify your email address by clicking the link below:</p>
            <a href="${verificationUrl}" class="button">Verify Email</a>
            <p>Or copy and paste this link in your browser:</p>
            <p><small>${verificationUrl}</small></p>
            <p>This link will expire in 24 hours.</p>
            <p>If you didn't create this account, you can safely ignore this email.</p>
            <div class="footer">
              <p>© 2025 Pamper Pro. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
    Verify Your Email

    Hi,

    Thank you for creating an account with Pamper Pro. To get started, please verify your email address by clicking the link below:

    ${verificationUrl}

    This link will expire in 24 hours.

    If you didn't create this account, you can safely ignore this email.

    © 2025 Pamper Pro. All rights reserved.
  `;

  return sendEmail({
    to,
    subject: "Verify Your Pamper Pro Email Address",
    html,
    text,
  });
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  to: string,
  token: string,
  baseUrl: string = "https://www.pamperpro.eu"
): Promise<boolean> {
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f5f5f5; padding: 20px; text-align: center; border-radius: 5px; }
          .content { padding: 20px; }
          .button { display: inline-block; padding: 12px 24px; background-color: #8B5CF6; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { color: #999; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Reset Your Password</h1>
          </div>
          <div class="content">
            <p>Hi,</p>
            <p>We received a request to reset your password. Click the link below to create a new password:</p>
            <a href="${resetUrl}" class="button">Reset Password</a>
            <p>Or copy and paste this link in your browser:</p>
            <p><small>${resetUrl}</small></p>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request a password reset, you can safely ignore this email.</p>
            <div class="footer">
              <p>© 2025 Pamper Pro. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
    Reset Your Password

    Hi,

    We received a request to reset your password. Click the link below to create a new password:

    ${resetUrl}

    This link will expire in 1 hour.

    If you didn't request a password reset, you can safely ignore this email.

    © 2025 Pamper Pro. All rights reserved.
  `;

  return sendEmail({
    to,
    subject: "Reset Your Pamper Pro Password",
    html,
    text,
  });
}
