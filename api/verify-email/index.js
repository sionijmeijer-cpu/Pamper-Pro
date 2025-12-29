const { executeQuery } = require('../lib/db');
const { sendWelcomeEmail } = require('../lib/acsEmailClient');

module.exports = async function (context, req) {
  context.log('Email verification request received');
  
  try {
    // Accept token from query parameter OR request body
    const token = req.query.token || (req.body && req.body.token);

    if (!token) {
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          success: false, 
          message: 'Verification token is required' 
        }),
      };
      return;
    }

    // Check for valid token with 24-hour expiry
    let users = [];
    try {
      users = await executeQuery(
        `SELECT id, "firstName", email, "isVerified", verification_sent_at 
         FROM users 
         WHERE verification_token = $1`,
        [token]
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
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          success: false, 
          message: 'Invalid or expired verification token' 
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

    // Check if token is expired (24 hours)
    if (user.verification_sent_at) {
      const sentAt = new Date(user.verification_sent_at);
      const now = new Date();
      const hoursDiff = (now - sentAt) / (1000 * 60 * 60);
      
      if (hoursDiff > 24) {
        context.res = {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            success: false, 
            message: 'Verification token has expired. Please request a new one.' 
          }),
        };
        return;
      }
    }

    // Mark email as verified and clear verification fields
    try {
      await executeQuery(
        'UPDATE users SET "isVerified" = \'true\', verification_token = NULL, verification_sent_at = NULL WHERE id = $1',
        [user.id]
      );
    } catch (updateErr) {
      context.log.error('Failed to update user verification status:', updateErr.message);
      context.res = {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          success: false, 
          message: 'Failed to verify email. Please try again.' 
        }),
      };
      return;
    }

    context.log('Email verified for user:', user.email);

    // Send welcome email (don't fail if this fails)
    try {
      const frontendUrl = process.env.FRONTEND_URL || 'https://www.pamperpro.eu';
      const welcomeResult = await sendWelcomeEmail(user.email, user.firstName, frontendUrl);
      
      if (welcomeResult.success) {
        context.log('Welcome email sent to:', user.email);
      } else {
        context.log.warn('Failed to send welcome email:', welcomeResult.error);
      }
    } catch (welcomeErr) {
      context.log.warn('Welcome email error (non-critical):', welcomeErr.message);
      // Don't fail verification if welcome email fails
    }

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        success: true, 
        message: 'Email verified successfully! You can now log in.' 
      }),
    };
  } catch (error) {
    context.log.error('Verification error:', error.message);
    if (error.stack) {
      context.log.error('Stack trace:', error.stack);
    }
    context.res = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        success: false, 
        message: 'Failed to verify email. Please try again.' 
      }),
    };
  }
};
