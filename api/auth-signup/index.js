const { executeQuery } = require('../lib/db');
const { hashPassword } = require('../lib/password');
const { sendVerificationEmail } = require('../lib/acsEmailClient');
const crypto = require('crypto');

module.exports = async function (context, req) {
  context.log('Auth signup request received');
  
  try {
    // Parse request body - handle both direct body and Azure Functions wrapping
    let body = req.body;
    
    // If body is a string, parse it
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }
    
    context.log('Request body:', JSON.stringify(body));
    
    const { firstName, lastName, email, password, phone, smsNotifications, promoCode, role } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          message: 'Missing required fields: firstName, lastName, email, password',
        }),
      };
      return;
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          message: 'Invalid email format',
        }),
      };
      return;
    }

    // Check if user already exists
    let existingUsers = [];
    try {
      existingUsers = await executeQuery(
        'SELECT id FROM users WHERE email = $1',
        [email.toLowerCase()]
      );
    } catch (dbErr) {
      context.log.error('Error checking existing users:', dbErr.message);
      context.res = {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          message: 'Database error. Please try again.',
        }),
      };
      return;
    }

    if (existingUsers && existingUsers.length > 0) {
      context.res = {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          message: 'An account with this email already exists',
        }),
      };
      return;
    }

    // Hash password
    let hashedPassword;
    try {
      hashedPassword = await hashPassword(password);
    } catch (hashErr) {
      context.log.error('Password hashing error:', hashErr.message);
      context.res = {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          message: 'Failed to process password. Please try again.',
        }),
      };
      return;
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Insert new user with correct column names (camelCase)
    let result;
    try {
      result = await executeQuery(
        `INSERT INTO users (
          "firstName", 
          "lastName", 
          email, 
          password, 
          phone, 
          role,
          "isVerified",
          verification_token,
          verification_sent_at,
          created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, 'false', $7, NOW(), NOW()) 
        RETURNING id, "firstName", "lastName", email, phone, role`,
        [
          firstName,
          lastName,
          email.toLowerCase(),
          hashedPassword,
          phone || null,
          role || 'client',
          verificationToken
        ]
      );
    } catch (insertErr) {
      context.log.error('User insert error:', insertErr.message);
      context.res = {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          message: 'Failed to create account. Please try again.',
        }),
      };
      return;
    }

    if (!result || result.length === 0) {
      context.res = {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          message: 'Failed to create account. Please try again.',
        }),
      };
      return;
    }

    const newUser = result[0];
    context.log('User created successfully:', newUser.id);

    // Send verification email using the standardized ACS client
    let emailResult = { success: false };
    try {
      const frontendUrl = process.env.FRONTEND_URL || 'https://www.pamperpro.eu';
      emailResult = await sendVerificationEmail(newUser.email, verificationToken, frontendUrl);
      
      if (emailResult.success) {
        context.log('Verification email sent successfully to:', newUser.email);
      } else {
        context.log.warn('Failed to send verification email:', emailResult.error);
      }
    } catch (emailErr) {
      context.log.error('Error sending verification email:', emailErr.message);
      // Don't fail signup if email fails - user can request resend
      emailResult = { success: false, error: emailErr.message };
    }

    // Return success response
    context.res = {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: emailResult.success 
          ? 'Account created successfully! Please check your email to verify your account.'
          : 'Account created! However, we could not send the verification email. Please use the resend option.',
        emailSent: emailResult.success,
        user: {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role,
        },
      }),
    };
  } catch (error) {
    context.log.error('Signup error:', error.message);
    if (error.stack) {
      context.log.error('Stack trace:', error.stack);
    }
    context.res = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        message: 'Failed to create account. Please try again.',
      }),
    };
  }
};
