module.exports = async function (context, req) {
  context.log("test-email classic function hit");

  context.res = {
    status: 200,
    headers: { "Content-Type": "application/json" },
    body: {
      message: "test working from classic model"
    }
  };
};

