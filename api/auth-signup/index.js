const { executeQuery } = require('../lib/db');
const { hashPassword } = require('../lib/password');
const { generateVerificationToken } = require('../lib/email');

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
      context.log.warn('Error checking existing users:', dbErr.message);
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
    let verificationToken = '';
    try {
      verificationToken = generateVerificationToken();
    } catch (tokenErr) {
      context.log.warn('Error generating verification token:', tokenErr.message);
      verificationToken = Math.random().toString(36).substring(2, 15);
    }

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
          created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, 'false', NOW()) 
        RETURNING id, "firstName", "lastName", email, phone, role`,
        [
          firstName,
          lastName,
          email.toLowerCase(),
          hashedPassword,
          phone || null,
          role || 'client'
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

    // Send verification email using the ACS service
    let emailSent = false;
    try {
      const { sendVerificationEmail } = require('../lib/sendVerificationEmail');
      emailSent = await sendVerificationEmail(newUser.email, verificationToken);
      if (emailSent) {
        context.log('Verification email sent to:', newUser.email);
      } else {
        context.log.warn('Failed to send verification email to:', newUser.email);
      }
    } catch (emailErr) {
      context.log.warn('Error sending verification email:', emailErr.message);
      // Don't fail signup if email fails - user can request resend
      emailSent = false;
    }

    // Return success response
    context.res = {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: 'Account created successfully! Please check your email to verify your account.',
        emailSent: emailSent,
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
