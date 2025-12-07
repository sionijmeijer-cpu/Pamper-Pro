const { app } = require("@azure/functions");

async function handler(request, context) {
  context.log("test-email JS function hit");
  return {
    status: 200,
    jsonBody: { message: "test working from JS" },
  };
}

app.http("test-email", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler,
});
