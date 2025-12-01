// api/db-execute/index.js

module.exports = async function (context, req) {
  context.log('[db-execute] test hit', req.body);

  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: {
      success: true,
      message: 'db-execute function reached (no DB yet)',
    },
  };
};
