const { EmailClient } = require("@azure/communication-email");

/**
 * Standardized Azure Communication Services Email Client
 * Uses COMMUNICATION_SERVICES_CONNECTION_STRING environment variable
 */

let emailClient = null;
let initializationError = null;

/**
 * Initialize the ACS Email Client
 * Returns the client or null if configuration is missing
 */
function getEmailClient() {
  // Return cached client if already initialized
  if (emailClient) return emailClient;
  
  // Return null if we already know initialization failed
  if (initializationError) return null;

  const connectionString = process.env.COMMUNICATION_SERVICES_CONNECTION_STRING;

  if (!connectionString || connectionString.trim() === '') {
    initializationError = 'Missing COMMUNICATION_SERVICES_CONNECTION_STRING environment variable';
    console.error('[ACS EMAIL ERROR]', initializationError);
    console.error('[ACS EMAIL ERROR] Please configure COMMUNICATION_SERVICES_CONNECTION_STRING in Azure Static Web Apps configuration');
    return null;
  }

  try {
    emailClient = new EmailClient(connectionString);
    console.log('[ACS EMAIL] Email client initialized successfully');
    return emailClient;
  } catch (error) {
    initializationError = `Failed to initialize EmailClient: ${error.message}`;
    console.error('[ACS EMAIL ERROR]', initializationError);
    return null;
  }
}

/**
 * Send an email using Azure Communication Services
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML content
 * @param {string} options.text - Plain text content
 * @returns {Promise<{success: boolean, message?: string, error?: string}>}
 */
async function sendEmail(options) {
  const { to, subject, html, text } = options;

  // Validate input
  if (!to || !subject || (!html && !text)) {
    return {
      success: false,
      error: 'Missing required email parameters (to, subject, html/text)',
    };
  }

  // Get email client
  const client = getEmailClient();
  
  if (!client) {
    console.error('[ACS EMAIL ERROR] Email service is not configured. Cannot send email to:', to);
    return {
      success: false,
      error: 'Email service is not configured. Please contact support.',
    };
  }

  // Get sender address from environment
  const senderAddress = process.env.VERIFICATION_SENDER || 'donotreply@pamperpro.eu';

  try {
    const message = {
      senderAddress: senderAddress,
      content: {
        subject: subject,
        plainText: text || '',
        html: html || '',
      },
      recipients: {
        to: [{ address: to }],
      },
    };

    console.log('[ACS EMAIL] Sending email to:', to);
    console.log('[ACS EMAIL] Subject:', subject);

    const poller = await client.beginSend(message);
    const result = await poller.pollUntilDone();

    console.log('[ACS EMAIL SUCCESS] Email sent successfully');
    console.log('[ACS EMAIL] Status:', result.status);
    console.log('[ACS EMAIL] Message ID:', result.id);

    return {
      success: true,
      message: 'Email sent successfully',
      messageId: result.id,
    };
  } catch (error) {
    console.error('[ACS EMAIL ERROR] Failed to send email');
    console.error('[ACS EMAIL ERROR] To:', to);
    console.error('[ACS EMAIL ERROR] Subject:', subject);
    console.error('[ACS EMAIL ERROR] Error:', error.message);
    if (error.stack) {
      console.error('[ACS EMAIL ERROR] Stack:', error.stack);
    }

    return {
      success: false,
      error: 'Failed to send email. Please try again later.',
    };
  }
}

/**
 * Send verification email with token
 */
async function sendVerificationEmail(email, token, frontendUrl = 'https://www.pamperpro.eu') {
  const verificationUrl = `${frontendUrl}/verify-email?token=${token}`;
  
  const html = `
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

  const text = `
Verify Your Email

Thank you for signing up with Pamper Pro!

Please verify your email address by clicking this link:
${verificationUrl}

This link will expire in 24 hours.

© 2025 Pamper Pro. All rights reserved.
  `;

  return sendEmail({
    to: email,
    subject: 'Verify Your Pamper Pro Email Address',
    html,
    text,
  });
}

/**
 * Send welcome email after verification
 */
async function sendWelcomeEmail(email, firstName, frontendUrl = 'https://www.pamperpro.eu') {
  const html = `
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
            <h1>Welcome to Pamper Pro!</h1>
          </div>
          <div class="content">
            <p>Hi ${firstName},</p>
            <p>Thank you for verifying your email and joining Pamper Pro!</p>
            <p>You can now:</p>
            <ul>
              <li>Book appointments with top beauty professionals</li>
              <li>Browse services and read reviews</li>
              <li>Manage your bookings and profile</li>
            </ul>
            <a href="${frontendUrl}/client-dashboard" class="button">Go to Dashboard</a>
            <p>If you have any questions, feel free to reach out to our support team.</p>
            <div class="footer">
              <p>© 2025 Pamper Pro. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Welcome to Pamper Pro!

Hi ${firstName},

Thank you for verifying your email and joining Pamper Pro!

You can now:
- Book appointments with top beauty professionals
- Browse services and read reviews
- Manage your bookings and profile

Visit your dashboard: ${frontendUrl}/client-dashboard

If you have any questions, feel free to reach out to our support team.

© 2025 Pamper Pro. All rights reserved.
  `;

  return sendEmail({
    to: email,
    subject: 'Welcome to Pamper Pro!',
    html,
    text,
  });
}

module.exports = {
  getEmailClient,
  sendEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
};
