import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { EmailClient } from "@azure/communication-email";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("=== SEND VERIFICATION EMAIL FUNCTION TRIGGERED ===");
  context.log("Request method:", req.method);
  context.log("Request body:", JSON.stringify(req.body));

  try {
    const { email, token } = req.body;

    context.log(`Processing verification email for: ${email}`);
    context.log(`Token provided: ${token ? 'YES' : 'NO'}`);

    if (!email || !token) {
      context.log("ERROR: Missing email or token in request body");
      context.res = {
        status: 400,
        body: { error: "Email and token are required", received: { email: !!email, token: !!token } },
      };
      return;
    }

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    context.log(`Frontend URL: ${frontendUrl}`);
    
    const verifyUrl = `${frontendUrl}/verify-email?token=${token}`;
    context.log(`Verification URL: ${verifyUrl}`);

    // Check ACS Connection String
    const connectionString = process.env.ACS_CONNECTION_STRING;
    context.log(`ACS Connection String configured: ${connectionString ? 'YES' : 'NO'}`);
    
    if (!connectionString) {
      context.log("ERROR: ACS_CONNECTION_STRING environment variable not set");
      context.res = {
        status: 500,
        body: { 
          error: "Email service not configured",
          missingEnvVars: ["ACS_CONNECTION_STRING"]
        },
      };
      return;
    }

    // Initialize ACS Email Client
    context.log("Initializing ACS Email Client...");
    const client = new EmailClient(connectionString);

    const senderEmail = process.env.VERIFICATION_SENDER || "donotreply@pamperpro.eu";
    context.log(`Sender email: ${senderEmail}`);

    // Prepare email message
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

    context.log("Email message prepared");
    context.log(`Sending email to: ${email}`);

    const poller = await client.beginSend(message);
    context.log("Email send initiated, waiting for completion...");
    
    const result = await poller.pollUntilDone();
    context.log(`Email sent successfully. Message ID: ${result}`);

    context.res = {
      status: 200,
      body: {
        success: true,
        messageId: result,
        email: email,
      },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : "";
    
    context.log(`ERROR: ${errorMessage}`);
    context.log(`ERROR STACK: ${errorStack}`);
    console.error("Email sending failed:", error);

    context.res = {
      status: 500,
      body: {
        error: "Failed to send verification email",
        details: errorMessage,
        type: error instanceof Error ? error.constructor.name : typeof error,
      },
    };
  }
};

export default httpTrigger;
