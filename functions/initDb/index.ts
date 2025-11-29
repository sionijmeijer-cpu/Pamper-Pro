import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { executeQuery } from "../lib/azureDbClient";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    console.log("Starting database initialization...");

    // Create extensions
    await executeQuery(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);

    // Create unified users table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        name TEXT,
        picture_url TEXT,
        role TEXT NOT NULL DEFAULT 'client',
        phone TEXT,
        address TEXT,
        email_verified BOOLEAN NOT NULL DEFAULT FALSE,
        google_sub TEXT UNIQUE,
        password_hash TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    // Create verification tokens table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS email_verification_tokens (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        token TEXT UNIQUE NOT NULL,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    // Create clients table (extended profile)
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        preferences TEXT,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      )
    `);

    // Create professionals table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS professionals (
        id SERIAL PRIMARY KEY,
        user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        business_name VARCHAR(255),
        bio TEXT,
        rating DECIMAL(3, 2) DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      )
    `);

    // Create services table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        professional_id INT REFERENCES professionals(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        duration_minutes INT,
        category VARCHAR(100),
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      )
    `);

    // Create bookings table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        client_id INT REFERENCES clients(id) ON DELETE CASCADE,
        professional_id INT REFERENCES professionals(id) ON DELETE CASCADE,
        service_id INT REFERENCES services(id) ON DELETE CASCADE,
        booking_date TIMESTAMPTZ NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        notes TEXT,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      )
    `);

    // Create payments table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        booking_id INT REFERENCES bookings(id) ON DELETE CASCADE,
        amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        payment_method VARCHAR(50),
        transaction_id VARCHAR(255),
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      )
    `);

    // Create reviews table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        booking_id INT REFERENCES bookings(id) ON DELETE CASCADE,
        client_id INT REFERENCES clients(id) ON DELETE CASCADE,
        professional_id INT REFERENCES professionals(id) ON DELETE CASCADE,
        rating INT CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      )
    `);

    // Create indexes
    await executeQuery(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`);
    await executeQuery(
      `CREATE INDEX IF NOT EXISTS idx_users_google_sub ON users(google_sub)`
    );
    await executeQuery(
      `CREATE INDEX IF NOT EXISTS idx_verification_tokens_user_id ON email_verification_tokens(user_id)`
    );
    await executeQuery(
      `CREATE INDEX IF NOT EXISTS idx_verification_tokens_token ON email_verification_tokens(token)`
    );
    await executeQuery(
      `CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id)`
    );
    await executeQuery(
      `CREATE INDEX IF NOT EXISTS idx_professionals_user_id ON professionals(user_id)`
    );
    await executeQuery(
      `CREATE INDEX IF NOT EXISTS idx_services_professional_id ON services(professional_id)`
    );
    await executeQuery(
      `CREATE INDEX IF NOT EXISTS idx_bookings_client_id ON bookings(client_id)`
    );
    await executeQuery(
      `CREATE INDEX IF NOT EXISTS idx_bookings_professional_id ON bookings(professional_id)`
    );
    await executeQuery(
      `CREATE INDEX IF NOT EXISTS idx_payments_booking_id ON payments(booking_id)`
    );
    await executeQuery(
      `CREATE INDEX IF NOT EXISTS idx_reviews_booking_id ON reviews(booking_id)`
    );

    context.res = {
      status: 200,
      body: {
        success: true,
        message: "Database initialized successfully with unified users table",
      },
    };
  } catch (error) {
    console.error("Database initialization error:", error);
    context.res = {
      status: 500,
      body: {
        error: "Database initialization failed",
        details: error instanceof Error ? error.message : String(error),
      },
    };
  }
};

export default httpTrigger;
