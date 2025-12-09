const { executeQuery } = require("../lib/db");

module.exports = async function (context, req) {
  context.log("verify-email request received");

  // Read token from query (?token=...) or body
  const token =
    (req.query && req.query.token) ||
    (req.body && req.body.token);

  if (!token) {
    context.res = {
      status: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: false,
        error: "Missing token",
      }),
    };
    return;
  }

  try {
    // 🔑 SIMPLE VERSION: no time limit yet
    // (We can add the 24h expiry afterwards if you want.)
    const result = await executeQuery(
      `
      UPDATE users
      SET 
        email_verified = TRUE,
        verification_token = NULL,
        verification_sent_at = NULL
      WHERE 
        verification_token = $1
        AND email_verified = FALSE
      RETURNING id, email
      `,
      [token]
    );

    if (!result || result.length === 0) {
      // No user matched this token
      context.res = {
        status: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          success: false,
          error: "Invalid or expired token",
        }),
      };
      return;
    }

    const user = result[0];
    context.log("Email verified for user:", user.id, user.email);

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        message: "Email verified successfully",
      }),
    };
  } catch (err) {
    context.log("verify-email error:", err);
    context.res = {
      status: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: false,
        error: "Server error verifying email",
      }),
    };
  }
};
