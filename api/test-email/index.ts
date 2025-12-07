import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { EmailClient } from "@azure/communication-email";

async function handler(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    const to = request.query.get("to") || process.env.TEST_EMAIL_TO;

    if (!to) {
      return {
        status: 400,
        jsonBody: { error: "Missing 'to' query parameter or TEST_EMAIL_TO env var" },
      };
    }

    const connectionString = process.env.ACS_CONNECTION_STRING;
    const sender = process.env.VERIFICATION_SENDER;

    context.log("Using sender:", sender, "to:", to);

    if (!connectionString || !sender) {
      context.log("Missing ACS_CONNECTION_STRING or VERIFICATION_SENDER");
      return {
        status: 500,
        jsonBody: { error: "Missing ACS_CONNECTION_STRING or VERIFICATION_SENDER" },
      };
    }

    const client = new EmailClient(connectionString);

    const message = {
      senderAddress: sender,
      recipients: {
        to: [{ address: to }],
      },
      content: {
        subject: "PamperPro test email",
        plainText: "If you see this, Azure Email is working.",
      },
    };

    context.log("Sending email via Azure Email...");
    const poller = await client.beginSend(message);
    const result = await poller.pollUntilDone();
    context.log("Send result:", JSON.stringify(result));

    return {
      status: 200,
      jsonBody: { success: true, result },
    };
  } catch (err: any) {
    context.log("Error sending email:", err);
    return {
      status: 500,
      jsonBody: { error: err?.message || "Unknown error" },
    };
  }
}

app.http("test-email", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler,
});
