const { Pool } = require('pg');

const connectionString = process.env.POSTGRES_CONNECTION_STRING || process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ Error: POSTGRES_CONNECTION_STRING environment variable is not set');
}

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = async function (context, req) {
  context.log('Migration request received');
  
  try {
    console.log('🔄 Running database migration...');

    // Check if columns already exist
    const checkQuery = `
      SELECT column_name FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name IN ('email_verified', 'verification_token', 'verification_sent_at')
    `;
    
    const result = await pool.query(checkQuery);
    const existingColumns = result.rows.map(row => row.column_name);

    const added = [];

    // Add email_verified if it doesn't exist
    if (!existingColumns.includes('email_verified')) {
      await pool.query('ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT false');
      added.push('email_verified');
      context.log('✅ Added email_verified column');
    }

    // Add verification_token if it doesn't exist
    if (!existingColumns.includes('verification_token')) {
      await pool.query('ALTER TABLE users ADD COLUMN verification_token VARCHAR(255)');
      added.push('verification_token');
      context.log('✅ Added verification_token column');
    }

    // Add verification_sent_at if it doesn't exist
    if (!existingColumns.includes('verification_sent_at')) {
      await pool.query('ALTER TABLE users ADD COLUMN verification_sent_at TIMESTAMP');
      added.push('verification_sent_at');
      context.log('✅ Added verification_sent_at column');
    }

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: 'Database migration completed successfully!',
        columnsAdded: added,
        existingColumns: existingColumns,
      }),
    };
  } catch (error) {
    context.log.error('Migration error:', error.message);
    context.res = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        error: error.message || 'Migration failed',
      }),
    };
  }
};
