const { executeQuery } = require('../lib/db');
const { comparePassword } = require('../lib/password');
const jwt = require('jsonwebtoken');

module.exports = async function (context, req) {
  context.log('Login request received');
  
  try {
    let body = req.body;
    if (typeof body === 'string') body = JSON.parse(body);
    
    const { email, password } = body;

    if (!email || !password) {
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'Email and password are required' }),
      };
      return;
    }

    const users = await executeQuery(
      'SELECT id, first_name, last_name, email, password_hash, role, email_verified FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (!users || users.length === 0) {
      context.res = {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'Invalid email or password' }),
      };
      return;
    }

    const user = users[0];
    const isValidPassword = await comparePassword(password, user.password_hash);

    if (!isValidPassword) {
      context.res = {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'Invalid email or password' }),
      };
      return;
    }

    if (!user.email_verified) {
      context.res = {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          success: false, 
          error: 'Email not verified',
          message: 'Please verify your email before logging in. Check your inbox for the verification link.'
        }),
      };
      return;
    }

    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, jwtSecret, { expiresIn: '7d' });

    context.log('Login successful for user:', user.email);

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        token: token,
        user: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          role: user.role,
        },
      }),
    };
  } catch (error) {
    context.log.error('Login error:', error.message);
    context.res = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'Login failed. Please try again.' }),
    };
  }
};
