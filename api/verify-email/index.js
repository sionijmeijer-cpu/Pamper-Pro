const { executeQuery } = require('../lib/db');
const { sendWelcomeEmail } = require('../lib/email');

module.exports = async function (context, req) {
  context.log('Email verification request received');
  
  try {
    const token = req.query.token;

    if (!token) {
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'Verification token is required' }),
      };
      return;
    }

    const users = await executeQuery(
      'SELECT id, first_name, email, email_verified FROM users WHERE verification_token = $1',
      [token]
    );

    if (!users || users.length === 0) {
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'Invalid or expired verification token' }),
      };
      return;
    }

    const user = users[0];

    if (user.email_verified) {
      context.res = {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true, message: 'Email already verified. You can log in now.' }),
      };
      return;
    }

    await executeQuery(
      'UPDATE users SET email_verified = TRUE, verification_token = NULL WHERE id = $1',
      [user.id]
    );

    context.log('Email verified for user:', user.email);

    sendWelcomeEmail(user.email, user.first_name).catch(err => context.log.error('Welcome email error:', err));

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Email verified successfully! You can now log in.' }),
    };
  } catch (error) {
    context.log.error('Verification error:', error.message);
    context.res = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'Failed to verify email. Please try again.' }),
    };
  }
};
