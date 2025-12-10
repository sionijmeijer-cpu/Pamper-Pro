const { executeQuery } = require('../lib/db');
const { sendVerificationEmail } = require('../lib/sendVerificationEmail');
const crypto = require('crypto');

module.exports = async function (context, req) {
  context.log('Resend verification email request received');
  
  try {
    let body = req.body;
    if (typeof body === 'string') body = JSON.parse(body);
    
    const { email } = body;

    if (!email) {
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'Email is required' }),
      };
      return;
    }

    // Look up user by email (case-insensitive)
    const users = await executeQuery(
      'SELECT id, email, email_verified FROM users WHERE LOWER(email) = LOWER($1)',
      [email]
    );

    if (!users || users.length === 0) {
      context.res = {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'NO_SUCH_USER' }),
      };
      return;
    }

    const user = users[0];

    // Check if already verified
    if (user.email_verified) {
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'ALREADY_VERIFIED' }),
      };
      return;
    }

    // Generate new verification token
    const newToken = crypto.randomBytes(32).toString('hex');
    
    // Update user with new token and timestamp
    await executeQuery(
      'UPDATE users SET verification_token = $1, verification_sent_at = NOW() WHERE id = $2',
      [newToken, user.id]
    );

    // Send verification email
    const emailSent = await sendVerificationEmail(user.email, newToken);

    if (!emailSent) {
      context.res = {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'SEND_FAILED' }),
      };
      return;
    }

    context.log('Verification email resent to:', user.email);

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        success: true,
        message: 'Verification email sent successfully' 
      }),
    };
  } catch (error) {
    context.log.error('Resend verification error:', error.message);
    context.res = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'Failed to resend verification email' }),
    };
  }
};
