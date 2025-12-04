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

async function initializeDatabase() {
  try {
    console.log('🔄 Connecting to database...');

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        phone VARCHAR(20),
        sms_notifications BOOLEAN DEFAULT true,
        promo_code VARCHAR(50),
        role VARCHAR(20) DEFAULT 'client',
        email_verified BOOLEAN DEFAULT false,
        verification_token VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await pool.query(createTableQuery);
    console.log('✅ Users table created successfully!');

    await pool.end();
    console.log('Connection closed.');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();
