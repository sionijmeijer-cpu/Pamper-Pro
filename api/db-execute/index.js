// api/db-execute/index.js
// Safe placeholder: no DB, no SQL, no errors.

module.exports = async function (context, req) {
  context.log("[db-execute] called with body:", req.body);

  context.res = {
    status: 200,
    headers: { "Content-Type": "application/json" },
    body: {
      success: true,
      message: "db-execute placeholder: endpoint is reachable but not executing SQL.",
    },
  };
};
