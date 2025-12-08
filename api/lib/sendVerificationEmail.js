const { EmailClient } = require("@azure/communication-email");

async function sendVerificationEmail(email, token) {
  const connectionString = process.env.ACS_CONNECTION_STRING;
  const sender = process.env.VERIFICATION_SENDER;
  const frontendUrl = process.env.FRONTEND_URL;

  if (!connectionString || !sender || !frontendUrl) {
    throw new Error("Email configuration missing on server");
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
      plainText: `Click to verify: ${verifyUrl}`,
      html: `<p><a href="${verifyUrl}">Verify your account</a></p>`
    },
  };

  const poller = await client.beginSend(message);
  await poller.pollUntilDone();
}

module.exports = { sendVerificationEmail };
