const { executeQuery } = require('../lib/db');
const jwt = require('jsonwebtoken');

module.exports = async function (context, req) {
  context.log('Get/Update profile request received');
  
  try {
    // Extract JWT token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      context.res = {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'Unauthorized' }),
      };
      return;
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    
    let decoded;
    try {
      decoded = jwt.verify(token, jwtSecret);
    } catch (err) {
      context.res = {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'Invalid token' }),
      };
      return;
    }

    const userId = decoded.userId;

    // Handle GET request - fetch user profile
    if (req.method === 'GET') {
      const users = await executeQuery(
        'SELECT id, first_name, last_name, email, phone, role, email_verified, created_at FROM users WHERE id = $1',
        [userId]
      );

      if (!users || users.length === 0) {
        context.res = {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ success: false, error: 'User not found' }),
        };
        return;
      }

      const user = users[0];
      context.res = {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: true,
          user: {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            emailVerified: user.email_verified,
            createdAt: user.created_at,
          },
        }),
      };
      return;
    }

    // Handle POST request - update user profile
    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') body = JSON.parse(body);

      const { firstName, lastName, phone } = body;

      // Build update query dynamically based on provided fields
      const updates = [];
      const values = [];
      let paramIndex = 1;

      if (firstName !== undefined) {
        updates.push(`first_name = $${paramIndex++}`);
        values.push(firstName);
      }
      if (lastName !== undefined) {
        updates.push(`last_name = $${paramIndex++}`);
        values.push(lastName);
      }
      if (phone !== undefined) {
        updates.push(`phone = $${paramIndex++}`);
        values.push(phone);
      }

      if (updates.length === 0) {
        context.res = {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ success: false, error: 'No fields to update' }),
        };
        return;
      }

      values.push(userId);
      const query = `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING id, first_name, last_name, email, phone, role`;

      const result = await executeQuery(query, values);

      if (!result || result.length === 0) {
        context.res = {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ success: false, error: 'Failed to update profile' }),
        };
        return;
      }

      const user = result[0];
      context.log('Profile updated for user:', user.email);

      context.res = {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: true,
          user: {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            phone: user.phone,
            role: user.role,
          },
        }),
      };
      return;
    }

    // Unsupported method
    context.res = {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'Method not allowed' }),
    };
  } catch (error) {
    context.log.error('Profile operation error:', error.message);
    context.res = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'Profile operation failed' }),
    };
  }
};
