const { Client } = require('@neondatabase/serverless');

async function initializeDatabase() {
  const connectionString = process.env.POSTGRES_CONNECTION_STRING || process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('POSTGRES_CONNECTION_STRING or DATABASE_URL environment variable not set');
  }

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');

    // Create users table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        sms_notifications BOOLEAN DEFAULT true,
        promo_code VARCHAR(50),
        role VARCHAR(50) DEFAULT 'client',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;

    await client.query(createTableQuery);
    console.log('Users table created successfully');

    // Create indexes for faster queries
    const createIndexesQuery = `
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC);
    `;

    await client.query(createIndexesQuery);
    console.log('Database indexes created successfully');

    console.log('Database initialization completed successfully');
    return { success: true, message: 'Database initialized' };
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  } finally {
    await client.end();
  }
}

module.exports = { initializeDatabase };
