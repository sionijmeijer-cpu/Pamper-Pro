import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { EmailClient } from "@azure/communication-email";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("Send verification email function triggered");

  try {
    const { email, token } = req.body;

    if (!email || !token) {
      context.res = {
        status: 400,
        body: { error: "Email and token are required" },
      };
      return;
    }

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const verifyUrl = `${frontendUrl}/verify-email?token=${token}`;

    const connectionString = process.env.ACS_CONNECTION_STRING;
    if (!connectionString) {
      context.log("ERROR: ACS_CONNECTION_STRING not configured");
      context.res = {
        status: 500,
        body: { error: "Email service not configured" },
      };
      return;
    }

    const client = new EmailClient(connectionString);

    const senderEmail = process.env.VERIFICATION_SENDER || "donotreply@pamperpro.eu";

    const message = {
      senderAddress: senderEmail,
      recipients: {
        to: [{ address: email }],
      },
      content: {
        subject: "Verify Your PamperPro Account",
        html: `
          <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">PamperPro</h1>
              </div>
              
              <div style="padding: 30px; background-color: #f9f9f9;">
                <h2 style="color: #333; margin-top: 0;">Verify Your Email</h2>
                
                <p style="color: #666; font-size: 16px; line-height: 1.6;">
                  Welcome to PamperPro! Click the button below to verify your email address and activate your account.
                </p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${verifyUrl}" style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 12px 30px;
                    text-decoration: none;
                    border-radius: 5px;
                    display: inline-block;
                    font-weight: bold;
                    font-size: 16px;
                  ">
                    Verify Account
                  </a>
                </div>
                
                <p style="color: #999; font-size: 14px;">
                  Or copy and paste this link in your browser:<br>
                  <code style="background: #f0f0f0; padding: 5px 10px; border-radius: 3px;">
                    ${verifyUrl}
                  </code>
                </p>
                
                <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px;">
                  This link will expire in 24 hours. If you didn't create this account, please ignore this email.
                </p>
              </div>
              
              <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #999;">
                <p>&copy; 2024 PamperPro. All rights reserved.</p>
              </div>
            </body>
          </html>
        `,
        plainText: `Verify your PamperPro account: ${verifyUrl}`,
      },
    };

    context.log(`Sending verification email to ${email}`);

    const poller = await client.beginSend(message);
    const result = await poller.pollUntilDone();

    context.log(`Email sent successfully. Message ID: ${result}`);

    context.res = {
      status: 200,
      body: {
        success: true,
        messageId: result,
      },
    };
  } catch (error) {
    context.log(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    console.error("Email sending failed:", error);

    context.res = {
      status: 500,
      body: {
        error: "Failed to send verification email",
        details: error instanceof Error ? error.message : String(error),
      },
    };
  }
};

export default httpTrigger;
