module.exports = async function (context, req) {
  const { email, password } = req.body || {};

  // Basic validation
  if (!email || !password) {
    context.res = {
      status: 400,
      body: { success: false, message: "Email and password are required." }
    };
    return;
  }

  // TODO: replace this with real authentication
  // For now, we just mock a successful login.
  context.log("Mock login for:", email);

  context.res = {
    status: 200,
    body: {
      success: true,
      message: "Login successful (mock).",
      user: {
        email
      }
    }
  };
};
