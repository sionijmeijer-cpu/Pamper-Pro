const { EmailClient } = require("@azure/communication-email");

module.exports = async function (context, req) {
  context.log('Test email endpoint called');

  // Step 1: Confirm endpoint is working
  if (!process.env.ACS_CONNECTION_STRING) {
    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: { message: 'test working from Shipper', note: 'ACS_CONNECTION_STRING not configured yet' }
    };
    return;
  }

  // Step 2: Send test email
  try {
    const toEmail = req.query.to || process.env.TEST_EMAIL_TO;
    
    if (!toEmail) {
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: { error: 'Missing recipient email', help: 'Add ?to=your@email.com or set TEST_EMAIL_TO env var' }
      };
      return;
    }

    const connectionString = process.env.ACS_CONNECTION_STRING;
    const senderEmail = process.env.VERIFICATION_SENDER || "donotreply@pamperpro.eu";

    context.log(`Sending test email to: ${toEmail} from: ${senderEmail}`);

    const emailClient = new EmailClient(connectionString);

    const emailMessage = {
      senderAddress: senderEmail,
      content: {
        subject: "Test Email from Pamper Pro",
        plainText: "This is a test email sent from Azure Communication Services via Pamper Pro backend.",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px; }
              .success { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✅ Test Email Successful!</h1>
              </div>
              <div class="content">
                <div class="success">
                  <strong>Success!</strong> Your Azure Communication Services email is working correctly.
                </div>
                <p>This is a test email from <strong>Pamper Pro</strong> backend.</p>
                <p>If you're seeing this, your email configuration is set up properly:</p>
                <ul>
                  <li>✅ ACS Connection String configured</li>
                  <li>✅ Sender email verified</li>
                  <li>✅ Email delivery working</li>
                </ul>
                <p><strong>Sent via:</strong> Azure Communication Services</p>
                <p><strong>Sender:</strong> ${senderEmail}</p>
                <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
              </div>
            </div>
          </body>
          </html>
        `,
      },
      recipients: {
        to: [{ address: toEmail }],
      },
    };

    const poller = await emailClient.beginSend(emailMessage);
    const result = await poller.pollUntilDone();

    context.log('Email sent successfully:', result);

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: {
        success: true,
        message: 'Test email sent successfully!',
        to: toEmail,
        from: senderEmail,
        messageId: result.id,
        status: result.status
      }
    };

  } catch (error) {
    context.log.error('Error sending test email:', error);
    
    context.res = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      body: {
        success: false,
        error: 'Failed to send test email',
        message: error.message,
        details: error.toString()
      }
    };
  }
};
