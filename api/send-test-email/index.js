const { EmailClient } = require("@azure/communication-email");

module.exports = async function (context, req) {
  context.log("send-test-email function hit");

  const email = req.query.to || (req.body && req.body.to);
  
  if (!email) {
    context.res = {
      status: 400,
      headers: { "Content-Type": "application/json" },
      body: { error: "Missing ?to=email@example.com" }
    };
    return;
  }

  const connectionString = process.env.ACS_CONNECTION_STRING;
  const sender = process.env.VERIFICATION_SENDER;

  if (!connectionString || !sender) {
    context.res = {
      status: 500,
      headers: { "Content-Type": "application/json" },
      body: { error: "ACS not configured on server" }
    };
    return;
  }

  const client = new EmailClient(connectionString);

  const message = {
    senderAddress: sender,
    recipients: { to: [{ address: email }] },
    content: {
      subject: "PamperPro Test Email",
      plainText: "This is a test email sent via Azure Communication Services",
      html: `<p>This is a <strong>test email</strong> sent via ACS!</p>`
    }
  };

  try {
    const poller = await client.beginSend(message);
    await poller.pollUntilDone();

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: { success: true }
    };
  } catch (err) {
    context.log("Email send failed", err);
    context.res = {
      status: 500,
      headers: { "Content-Type": "application/json" },
      body: { error: err.message }
    };
  }
};
