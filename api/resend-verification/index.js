const { executeQuery } = require('../lib/db');
const { sendVerificationEmail } = require('../lib/acsEmailClient');
const crypto = require('crypto');

module.exports = async function (context, req) {
  context.log('Resend verification email request received');
  
  try {
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }
    
    const { email } = body;

    if (!email) {
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          success: false, 
          message: 'Email is required' 
        }),
      };
      return;
    }

    // Look up user by email (case-insensitive)
    let users = [];
    try {
      users = await executeQuery(
        'SELECT id, email, "isVerified" FROM users WHERE LOWER(email) = LOWER($1)',
        [email]
      );
    } catch (dbErr) {
      context.log.error('Database query error:', dbErr.message);
      context.res = {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          success: false, 
          message: 'Database error. Please try again.' 
        }),
      };
      return;
    }

    if (!users || users.length === 0) {
      context.res = {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          success: false, 
          message: 'No account found with this email address' 
        }),
      };
      return;
    }

    const user = users[0];

    // Check if already verified
    const isVerified = user.isVerified === 'true' || user.isVerified === true || user.isVerified === 1;
    
    if (isVerified) {
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          success: false, 
          message: 'This email is already verified' 
        }),
      };
      return;
    }

    // Generate new verification token
    const newToken = crypto.randomBytes(32).toString('hex');
    
    // Update user with new token and timestamp
    try {
      await executeQuery(
        'UPDATE users SET verification_token = $1, verification_sent_at = NOW() WHERE id = $2',
        [newToken, user.id]
      );
    } catch (updateErr) {
      context.log.error('Failed to update verification token:', updateErr.message);
      context.res = {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          success: false, 
          message: 'Failed to update verification token. Please try again.' 
        }),
      };
      return;
    }

    // Send verification email using standardized ACS client
    let emailResult;
    try {
      const frontendUrl = process.env.FRONTEND_URL || 'https://www.pamperpro.eu';
      emailResult = await sendVerificationEmail(user.email, newToken, frontendUrl);
    } catch (emailErr) {
      context.log.error('Error sending verification email:', emailErr.message);
      context.res = {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          success: false, 
          message: 'We could not send the verification email. Please try again later.' 
        }),
      };
      return;
    }

    if (!emailResult.success) {
      context.log.error('Failed to send verification email:', emailResult.error);
      context.res = {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          success: false, 
          message: emailResult.error || 'We could not send the verification email. Please try again later.' 
        }),
      };
      return;
    }

    context.log('Verification email resent successfully to:', user.email);

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        success: true,
        message: 'Verification email sent successfully. Please check your inbox.' 
      }),
    };
  } catch (error) {
    context.log.error('Resend verification error:', error.message);
    if (error.stack) {
      context.log.error('Stack trace:', error.stack);
    }
    context.res = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        success: false, 
        message: 'Failed to resend verification email. Please try again.' 
      }),
    };
  }
};
