const { executeQuery } = require('../lib/db');
const { sendWelcomeEmail } = require('../lib/email');

module.exports = async function (context, req) {
  context.log('Email verification request received');
  
  try {
    // Accept token from query parameter OR request body
    const token = req.query.token || (req.body && req.body.token);

    if (!token) {
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'Verification token is required' }),
      };
      return;
    }

    // Check for valid token with 24-hour expiry
    const users = await executeQuery(
      `SELECT id, first_name, email, email_verified, verification_sent_at 
       FROM users 
       WHERE verification_token = $1 
       AND email_verified = FALSE`,
      [token]
    );

    if (!users || users.length === 0) {
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'Invalid or expired token' }),
      };
      return;
    }

    const user = users[0];

    // Check if token is expired (24 hours)
    if (user.verification_sent_at) {
      const sentAt = new Date(user.verification_sent_at);
      const now = new Date();
      const hoursDiff = (now - sentAt) / (1000 * 60 * 60);
      
      if (hoursDiff > 24) {
        context.res = {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ success: false, error: 'Invalid or expired token' }),
        };
        return;
      }
    }

    // Mark email as verified and clear verification fields
    await executeQuery(
      'UPDATE users SET email_verified = TRUE, verification_token = NULL, verification_sent_at = NULL WHERE id = $1',
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
