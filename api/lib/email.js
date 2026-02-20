const axios = require('axios');
const crypto = require('crypto');

/**
 * Generate a secure email verification token
 */
function generateVerificationToken() {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Send email using SendGrid
 */
async function sendEmail(options) {
  const sendGridApiKey = process.env.SENDGRID_API_KEY;
  const emailFrom = process.env.EMAIL_FROM || 'noreply@pamperpro.eu';

  console.log('[DEBUG] SENDGRID_API_KEY exists:', !!sendGridApiKey);
  console.log('[DEBUG] All env vars:', Object.keys(process.env).filter(k => k.includes('SENDGRID') || k.includes('EMAIL')));

  if (!sendGridApiKey) {
    console.warn('[DEV MODE] Email not sent (SENDGRID_API_KEY not configured):');
    console.warn('To:', options.to);
    console.warn('Subject:', options.subject);
    console.warn('Body:', options.html);
    return true;
  }

  try {
    const response = await axios.post(
      'https://api.sendgrid.com/v3/mail/send',
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
            type: 'text/html',
            value: options.html,
          },
          {
            type: 'text/plain',
            value: options.text,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${sendGridApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Email sent successfully:', response.status);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error.response?.data || error.message);
    return false;
  }
}

/**
 * Send welcome/verification email
 */
async function sendWelcomeEmail(to, firstName, baseUrl = 'https://www.pamperpro.eu') {
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
            <p>Thank you for creating an account with Pamper Pro! We're excited to have you join our community.</p>
            <p>You can now:</p>
            <ul>
              <li>Book appointments with top beauty professionals</li>
              <li>Browse services and read reviews</li>
              <li>Manage your bookings and profile</li>
            </ul>
            <a href="${baseUrl}/client-dashboard" class="button">Go to Dashboard</a>
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

    Thank you for creating an account with Pamper Pro! We're excited to have you join our community.

    You can now:
    - Book appointments with top beauty professionals
    - Browse services and read reviews
    - Manage your bookings and profile

    Visit your dashboard: ${baseUrl}/client-dashboard

    If you have any questions, feel free to reach out to our support team.

    © 2025 Pamper Pro. All rights reserved.
  `;

  return sendEmail({
    to,
    subject: 'Welcome to Pamper Pro!',
    html,
    text,
  });
}

module.exports = {
  generateVerificationToken,
  sendEmail,
  sendWelcomeEmail,
};
