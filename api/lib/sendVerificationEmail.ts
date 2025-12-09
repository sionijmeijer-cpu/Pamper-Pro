import { EmailClient } from "@azure/communication-email";

export async function sendVerificationEmail(email: string, token: string): Promise<boolean> {
  const connectionString = process.env.ACS_CONNECTION_STRING;
  const senderEmail = process.env.VERIFICATION_SENDER;
  const frontendUrl = process.env.FRONTEND_URL || "https://www.pamperpro.eu";

  console.log("[EMAIL DEBUG] Environment check:");
  console.log("  - ACS_CONNECTION_STRING:", connectionString ? "SET (length: " + connectionString.length + ")" : "MISSING");
  console.log("  - VERIFICATION_SENDER:", senderEmail || "MISSING");
  console.log("  - FRONTEND_URL:", frontendUrl);
  console.log("  - Target email:", email);

  if (!connectionString || !senderEmail) {
    console.error("[EMAIL ERROR] Missing ACS_CONNECTION_STRING or VERIFICATION_SENDER");
    return false;
  }

  try {
    const verificationUrl = `${frontendUrl}/verify-email?token=${token}`;

    const emailClient = new EmailClient(connectionString);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #8B5CF6; padding: 30px; text-align: center; border-radius: 5px 5px 0 0; }
            .header h1 { color: white; margin: 0; }
            .content { padding: 30px; background-color: #f9f9f9; }
            .button { display: inline-block; padding: 12px 24px; background-color: #8B5CF6; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { color: #999; font-size: 12px; margin-top: 20px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Verify Your Email</h1>
            </div>
            <div class="content">
              <p>Thank you for signing up with Pamper Pro!</p>
              <p>Please verify your email address by clicking the button below:</p>
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
              <p>This link will expire in 24 hours.</p>
              <div class="footer">
                <p>© 2025 Pamper Pro. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const plainTextContent = `
      Verify Your Email

      Thank you for signing up with Pamper Pro!

      Please verify your email address by clicking this link:
      ${verificationUrl}

      This link will expire in 24 hours.

      © 2025 Pamper Pro. All rights reserved.
    `;

    const message = {
      senderAddress: senderEmail,
      content: {
        subject: "Verify Your Pamper Pro Email Address",
        plainText: plainTextContent,
        html: htmlContent,
      },
      recipients: {
        to: [{ address: email }],
      },
    };

    console.log("[EMAIL DEBUG] Attempting to send email...");
    const poller = await emailClient.beginSend(message);
    console.log("[EMAIL DEBUG] Poller created, waiting for completion...");
    const result = await poller.pollUntilDone();

    console.log("[EMAIL SUCCESS] Verification email sent!");
    console.log("  - To:", email);
    console.log("  - Status:", result.status);
    console.log("  - Message ID:", result.id);
    return true;
  } catch (error) {
    console.error("[EMAIL ERROR] Failed to send verification email");
    console.error("  - Error message:", error instanceof Error ? error.message : String(error));
    console.error("  - Error type:", error instanceof Error ? error.constructor.name : typeof error);
    if (error instanceof Error && error.stack) {
      console.error("  - Stack trace:", error.stack);
    }
    return false;
  }
}
