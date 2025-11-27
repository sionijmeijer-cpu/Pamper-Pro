import { query } from "../database/client";

/**
 * Initialize database schema - Run once when app starts
 */
export async function initializeDatabase(): Promise<void> {
  try {
    console.log("🔧 Initializing database schema...");

    // Users Table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "firstName" VARCHAR(100) NOT NULL,
        "lastName" VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        role VARCHAR(50) NOT NULL DEFAULT 'client',
        "profileImage" TEXT,
        bio TEXT,
        location VARCHAR(255),
        latitude FLOAT,
        longitude FLOAT,
        "isVerified" VARCHAR(10) DEFAULT 'false',
        "isActive" VARCHAR(10) DEFAULT 'true',
        "lastLogin" TIMESTAMP,
        "professionalDetails" JSONB,
        "clientPreferences" JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Clients Table
    await query(`
      CREATE TABLE IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        "favoriteServices" JSONB,
        "preferredProfessionals" JSONB,
        "hairType" VARCHAR(50),
        "skinTone" VARCHAR(50),
        allergies TEXT,
        "notificationPreferences" JSONB,
        "totalSpent" FLOAT DEFAULT 0,
        "appointmentCount" INTEGER DEFAULT 0,
        "lastAppointmentDate" TIMESTAMP,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Professionals Table
    await query(`
      CREATE TABLE IF NOT EXISTS professionals (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        "businessName" VARCHAR(255) NOT NULL,
        "businessType" VARCHAR(50),
        specialties JSONB,
        "yearsExperience" INTEGER,
        "hourlyRate" FLOAT,
        certification TEXT,
        portfolio JSONB,
        availability JSONB,
        "serviceArea" VARCHAR(100),
        rating FLOAT DEFAULT 5.0,
        "totalReviews" INTEGER DEFAULT 0,
        "completedAppointments" INTEGER DEFAULT 0,
        "totalEarnings" FLOAT DEFAULT 0,
        "isVerified" VARCHAR(10) DEFAULT 'false',
        "bankAccount" JSONB,
        "paymentMethod" VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Services Table
    await query(`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        "professionalId" INTEGER NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        description TEXT,
        "basePrice" FLOAT NOT NULL,
        "durationMinutes" INTEGER,
        "imageUrl" TEXT,
        "isActive" VARCHAR(10) DEFAULT 'true',
        "bookingCount" INTEGER DEFAULT 0,
        "averageRating" FLOAT DEFAULT 5.0,
        "variationOptions" JSONB,
        requirements JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Bookings Table
    await query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        "clientId" INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
        "professionalId" INTEGER NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
        "serviceId" INTEGER NOT NULL REFERENCES services(id) ON DELETE CASCADE,
        "appointmentDate" TIMESTAMP NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        "totalPrice" FLOAT,
        notes TEXT,
        "reminderSent" VARCHAR(10) DEFAULT 'false',
        "completedAt" TIMESTAMP,
        "cancellationReason" TEXT,
        "rescheduledFrom" INTEGER REFERENCES bookings(id),
        duration INTEGER,
        feedback JSONB,
        "paymentStatus" VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Payments Table
    await query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        "bookingId" INTEGER NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
        "clientId" INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
        "professionalId" INTEGER NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
        amount FLOAT NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        "paymentMethod" VARCHAR(50),
        "transactionId" VARCHAR(255),
        receipt TEXT,
        "refundAmount" FLOAT DEFAULT 0,
        "refundReason" TEXT,
        metadata JSONB,
        "processedAt" TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Reviews Table
    await query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        "bookingId" INTEGER NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
        "clientId" INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
        "professionalId" INTEGER NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
        "serviceId" INTEGER NOT NULL REFERENCES services(id) ON DELETE CASCADE,
        rating INTEGER NOT NULL,
        title VARCHAR(255),
        comment TEXT,
        cleanliness INTEGER,
        professionalism INTEGER,
        "skillLevel" INTEGER,
        "timelinessRating" INTEGER,
        "wouldRecommend" VARCHAR(10) DEFAULT 'true',
        "verifiedBooking" VARCHAR(10) DEFAULT 'true',
        photos JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes
    await query(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_clients_userId ON clients("userId")`);
    await query(`CREATE INDEX IF NOT EXISTS idx_professionals_userId ON professionals("userId")`);
    await query(`CREATE INDEX IF NOT EXISTS idx_services_professionalId ON services("professionalId")`);
    await query(`CREATE INDEX IF NOT EXISTS idx_services_category ON services(category)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_bookings_clientId ON bookings("clientId")`);
    await query(`CREATE INDEX IF NOT EXISTS idx_bookings_professionalId ON bookings("professionalId")`);
    await query(`CREATE INDEX IF NOT EXISTS idx_bookings_appointmentDate ON bookings("appointmentDate")`);
    await query(`CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_payments_bookingId ON payments("bookingId")`);
    await query(`CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_reviews_professionalId ON reviews("professionalId")`);
    await query(`CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating)`);

    console.log("✅ Database schema initialized successfully");
  } catch (error) {
    console.error("❌ Database initialization error:", error);
    throw error;
  }
}

/**
 * Health check - verify database connection
 */
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    const result = await query("SELECT NOW() as now");
    return result.rows.length > 0;
  } catch (error) {
    console.error("❌ Database health check failed:", error);
    return false;
  }
}

/**
 * Seed sample data for development
 */
export async function seedSampleData(): Promise<void> {
  try {
    console.log("🌱 Seeding sample data...");

    // Check if we already have sample data
    const existingUsers = await query("SELECT COUNT(*) as count FROM users");
    if ((existingUsers.rows[0] as any).count > 0) {
      console.log("ℹ️  Sample data already exists");
      return;
    }

    // Sample users
    const sampleUsers = [
      {
        email: "client1@example.com",
        password: "hashed_password_1",
        firstName: "Sarah",
        lastName: "Johnson",
        role: "client"
      },
      {
        email: "professional1@example.com",
        password: "hashed_password_2",
        firstName: "Maya",
        lastName: "Williams",
        role: "professional"
      }
    ];

    for (const user of sampleUsers) {
      await query(
        `INSERT INTO users (email, password, "firstName", "lastName", role, "profileImage", created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())`,
        [
          user.email,
          user.password,
          user.firstName,
          user.lastName,
          user.role,
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`
        ]
      );
    }

    console.log("✅ Sample data seeded successfully");
  } catch (error) {
    console.error("❌ Seed data error:", error);
  }
}
