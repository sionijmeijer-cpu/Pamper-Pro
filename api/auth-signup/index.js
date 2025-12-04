const { executeQuery } = require('../lib/db');
const { hashPassword } = require('../lib/password');
const { generateVerificationToken, sendVerificationEmail } = require('../lib/email');

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
    
    const { firstName, lastName, email, password, phone, smsNotifications, promoCode } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          error: 'Missing required fields: firstName, lastName, email, password',
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
          error: 'Invalid email format',
        }),
      };
      return;
    }

    // Check if user already exists
    const existingUsers = await executeQuery(
      'SELECT id FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (existingUsers && existingUsers.length > 0) {
      context.res = {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          error: 'An account with this email already exists',
        }),
      };
      return;
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Generate verification token
    const verificationToken = generateVerificationToken();

    // Insert new user with verification token
    const result = await executeQuery(
      `INSERT INTO users (
        first_name, 
        last_name, 
        email, 
        password_hash, 
        phone, 
        sms_notifications, 
        promo_code, 
        role,
        email_verified,
        verification_token,
        verification_sent_at,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, FALSE, $9, NOW(), NOW()) 
      RETURNING id, first_name, last_name, email, phone, role`,
      [
        firstName,
        lastName,
        email.toLowerCase(),
        hashedPassword,
        phone || null,
        smsNotifications !== false,
        promoCode || null,
        'client',
        verificationToken
      ]
    );

    if (!result || result.length === 0) {
      throw new Error('Failed to insert user');
    }

    const newUser = result[0];
    context.log('User created successfully:', newUser.id);

    // Send verification email
    let emailSent = false;
    try {
      const baseUrl = process.env.CLIENT_BASE_URL || 'https://www.pamperpro.eu';
      emailSent = await sendVerificationEmail(newUser.email, verificationToken, baseUrl);
      if (emailSent) {
        context.log('Verification email sent to:', newUser.email);
      } else {
        context.log.warn('Failed to send verification email to:', newUser.email);
      }
    } catch (err) {
      context.log.error('Error sending verification email:', err);
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
          firstName: newUser.first_name,
          lastName: newUser.last_name,
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
        error: error.message || 'Failed to create account. Please try again.',
      }),
    };
  }
};
