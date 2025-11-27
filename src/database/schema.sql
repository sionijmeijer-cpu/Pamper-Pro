-- Users Table (authentication and base profiles)
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
);

-- Clients Table (client-specific data)
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
);

-- Professionals Table (service provider data)
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
);

-- Services Table (salon/professional services)
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
);

-- Bookings Table (appointments)
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
);

-- Payments Table (transaction tracking)
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
);

-- Reviews Table (client reviews and ratings)
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
);

-- Indexes for common queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_clients_userId ON clients("userId");
CREATE INDEX idx_professionals_userId ON professionals("userId");
CREATE INDEX idx_services_professionalId ON services("professionalId");
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_bookings_clientId ON bookings("clientId");
CREATE INDEX idx_bookings_professionalId ON bookings("professionalId");
CREATE INDEX idx_bookings_appointmentDate ON bookings("appointmentDate");
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_payments_bookingId ON payments("bookingId");
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_reviews_professionalId ON reviews("professionalId");
CREATE INDEX idx_reviews_rating ON reviews(rating);
