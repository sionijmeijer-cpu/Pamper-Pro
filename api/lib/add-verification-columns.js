const { Pool } = require('pg');

const connectionString = process.env.POSTGRES_CONNECTION_STRING || process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ Error: POSTGRES_CONNECTION_STRING environment variable is not set');
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function addVerificationColumns() {
  try {
    console.log('🔄 Connecting to database...');

    // Check if columns already exist
    const checkQuery = `
      SELECT column_name FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name IN ('email_verified', 'verification_token', 'verification_sent_at')
    `;
    
    const result = await pool.query(checkQuery);
    const existingColumns = result.rows.map(row => row.column_name);

    // Add email_verified if it doesn't exist
    if (!existingColumns.includes('email_verified')) {
      await pool.query('ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT false');
      console.log('✅ Added email_verified column');
    } else {
      console.log('ℹ️  email_verified column already exists');
    }

    // Add verification_token if it doesn't exist
    if (!existingColumns.includes('verification_token')) {
      await pool.query('ALTER TABLE users ADD COLUMN verification_token VARCHAR(255)');
      console.log('✅ Added verification_token column');
    } else {
      console.log('ℹ️  verification_token column already exists');
    }

    // Add verification_sent_at if it doesn't exist
    if (!existingColumns.includes('verification_sent_at')) {
      await pool.query('ALTER TABLE users ADD COLUMN verification_sent_at TIMESTAMP');
      console.log('✅ Added verification_sent_at column');
    } else {
      console.log('ℹ️  verification_sent_at column already exists');
    }

    console.log('✅ Database migration completed successfully!');
    await pool.end();
  } catch (error) {
    console.error('❌ Error during migration:', error.message);
    process.exit(1);
  }
}

addVerificationColumns();
