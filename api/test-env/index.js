/**
 * Test endpoint to check if environment variables are properly set
 * This helps debug SendGrid configuration issues
 */
module.exports = async function (context, req) {
  const envVars = {
    SENDGRID_API_KEY_SET: !!process.env.SENDGRID_API_KEY,
    EMAIL_FROM_SET: !!process.env.EMAIL_FROM,
    DATABASE_URL_SET: !!process.env.DATABASE_URL,
    POSTGRES_CONNECTION_STRING_SET: !!process.env.POSTGRES_CONNECTION_STRING,
    NODE_ENV: process.env.NODE_ENV,
  };

  // Show API key prefix for debugging (first 10 chars + ...)
  if (process.env.SENDGRID_API_KEY) {
    const key = process.env.SENDGRID_API_KEY;
    envVars.SENDGRID_API_KEY_PREFIX = key.substring(0, 10) + '...';
    envVars.SENDGRID_API_KEY_LENGTH = key.length;
  }

  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: envVars,
  };
};
