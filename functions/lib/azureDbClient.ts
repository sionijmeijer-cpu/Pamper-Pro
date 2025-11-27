import { neon } from '@neondatabase/serverless';

let dbClient: any = null;

export function getAzureDbClient() {
  if (!dbClient) {
    const connectionString = process.env.VITE_POSTGRES_CONNECTION_STRING ||
      `postgresql://${process.env.VITE_POSTGRES_USER}:${encodeURIComponent(process.env.VITE_POSTGRES_PASSWORD || '')}@${process.env.VITE_POSTGRES_HOST}:${process.env.VITE_POSTGRES_PORT}/${process.env.VITE_POSTGRES_DATABASE}?sslmode=require`;
    
    dbClient = neon(connectionString);
  }
  return dbClient;
}

export async function executeQuery(sql: string, params: any[] = []) {
  try {
    const db = getAzureDbClient();
    const result = await db(sql, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export async function initializeDatabase() {
  const db = getAzureDbClient();
  
  const schema = `
    -- Users table
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      full_name VARCHAR(255),
      user_type VARCHAR(50) CHECK (user_type IN ('client', 'professional')),
      is_verified BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Clients table
    CREATE TABLE IF NOT EXISTS clients (
      id SERIAL PRIMARY KEY,
      user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      phone VARCHAR(20),
      preferences TEXT,
      avatar_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Professionals table
    CREATE TABLE IF NOT EXISTS professionals (
      id SERIAL PRIMARY KEY,
      user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      business_name VARCHAR(255),
      phone VARCHAR(20),
      bio TEXT,
      avatar_url VARCHAR(255),
      rating DECIMAL(3, 2) DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Services table
    CREATE TABLE IF NOT EXISTS services (
      id SERIAL PRIMARY KEY,
      professional_id INT REFERENCES professionals(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      duration_minutes INT,
      category VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Bookings table
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      client_id INT REFERENCES clients(id) ON DELETE CASCADE,
      service_id INT REFERENCES services(id) ON DELETE CASCADE,
      professional_id INT REFERENCES professionals(id) ON DELETE CASCADE,
      booking_date TIMESTAMP NOT NULL,
      status VARCHAR(50) CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending',
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Payments table
    CREATE TABLE IF NOT EXISTS payments (
      id SERIAL PRIMARY KEY,
      booking_id INT REFERENCES bookings(id) ON DELETE CASCADE,
      amount DECIMAL(10, 2) NOT NULL,
      status VARCHAR(50) CHECK (status IN ('pending', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
      payment_method VARCHAR(50),
      transaction_id VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Reviews table
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      booking_id INT REFERENCES bookings(id) ON DELETE CASCADE,
      client_id INT REFERENCES clients(id) ON DELETE CASCADE,
      professional_id INT REFERENCES professionals(id) ON DELETE CASCADE,
      rating INT CHECK (rating >= 1 AND rating <= 5),
      comment TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Create indexes for better performance
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id);
    CREATE INDEX IF NOT EXISTS idx_professionals_user_id ON professionals(user_id);
    CREATE INDEX IF NOT EXISTS idx_services_professional_id ON services(professional_id);
    CREATE INDEX IF NOT EXISTS idx_bookings_client_id ON bookings(client_id);
    CREATE INDEX IF NOT EXISTS idx_bookings_professional_id ON bookings(professional_id);
    CREATE INDEX IF NOT EXISTS idx_bookings_service_id ON bookings(service_id);
    CREATE INDEX IF NOT EXISTS idx_payments_booking_id ON payments(booking_id);
    CREATE INDEX IF NOT EXISTS idx_reviews_booking_id ON reviews(booking_id);
  `;

  const statements = schema.split(';').filter(s => s.trim());
  
  for (const statement of statements) {
    try {
      await db(statement);
    } catch (error: any) {
      // Ignore "already exists" errors
      if (!error.message.includes('already exists')) {
        console.error('Schema initialization error:', error);
      }
    }
  }
}
