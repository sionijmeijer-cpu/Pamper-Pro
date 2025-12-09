const { EmailClient } = require("@azure/communication-email");

async function sendVerificationEmail(email, token) {
  const connectionString = process.env.ACS_CONNECTION_STRING;
  const sender = process.env.VERIFICATION_SENDER;
  const frontendUrl = process.env.FRONTEND_URL;

  if (!connectionString || !sender || !frontendUrl) {
    console.error("Email configuration missing on server", {
      hasConnectionString: !!connectionString,
      hasSender: !!sender,
      hasFrontendUrl: !!frontendUrl,
    });
    // Tell caller it failed
    return false;
  }

  const verifyUrl = `${frontendUrl}/verify-email?token=${encodeURIComponent(
    token
  )}`;

  const client = new EmailClient(connectionString);

  const message = {
    senderAddress: sender,
    recipients: {
      to: [{ address: email }],
    },
    content: {
      subject: "Verify your PamperPro account",
      plainText: `Click this link to verify your account: ${verifyUrl}`,
      html: `
        <p>Hello,</p>
        <p>Please verify your PamperPro account by clicking the link below:</p>
        <p><a href="${verifyUrl}">Verify account</a></p>
        <p>If you didn't sign up, you can ignore this email.</p>
      `,
    },
  };

  try {
    console.log("Sending verification email to:", email);
    const poller = await client.beginSend(message);
    await poller.pollUntilDone();
    console.log("Verification email sent successfully to:", email);
    return true;
  } catch (err) {
    console.error("Failed to send verification email:", err);
    return false;
  }
}

module.exports = { sendVerificationEmail };

