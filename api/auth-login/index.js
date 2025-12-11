const { executeQuery } = require('../lib/db');
const bcrypt = require('bcryptjs');

module.exports = async function (context, req) {
  context.log('Auth login request received');
  
  try {
    // Parse request body
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }
    
    const { email, password } = body;

    if (!email || !password) {
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          message: 'Email and password are required',
        }),
      };
      return;
    }

    // Get user from database with camelCase column names
    let users = [];
    try {
      users = await executeQuery(
        'SELECT id, email, password, "firstName", "lastName", phone, role, "isVerified", "profileImage" FROM users WHERE email = $1',
        [email.toLowerCase()]
      );
    } catch (dbErr) {
      context.log.error('Database query error:', dbErr.message);
      context.res = {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          message: 'Failed to login. Please try again.',
        }),
      };
      return;
    }

    if (!users || users.length === 0) {
      context.res = {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          message: 'Invalid email or password',
        }),
      };
      return;
    }

    const user = users[0];

    // Check if email is verified
    const isVerified = user.isVerified === 'true' || user.isVerified === true || user.isVerified === 1;
    
    if (!isVerified) {
      context.res = {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          emailNotVerified: true,
          message: 'Please verify your email before logging in. Check your inbox for the verification link.',
        }),
      };
      return;
    }

    // Verify password
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, user.password);
    } catch (bcryptErr) {
      context.log.error('Password comparison error:', bcryptErr.message);
      context.res = {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          message: 'Failed to login. Please try again.',
        }),
      };
      return;
    }
    
    if (!isValidPassword) {
      context.res = {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          message: 'Invalid email or password',
        }),
      };
      return;
    }

    // Update last login
    try {
      await executeQuery(
        'UPDATE users SET "lastLogin" = NOW() WHERE id = $1',
        [user.id]
      );
    } catch (updateErr) {
      context.log.warn('Failed to update lastLogin:', updateErr.message);
      // Don't fail the login if this fails
    }

    // Return user data
    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          role: user.role,
          isVerified: isVerified,
          profileImage: user.profileImage,
        },
      }),
    };
  } catch (error) {
    context.log.error('Login error:', error.message);
    context.res = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        message: 'Failed to login. Please try again.',
      }),
    };
  }
};
