import turso from "../database/client";
import { User, UserRole } from "../entities/User";

/**
 * Authentication Service - Handles all auth operations with Azure Database
 */

// Password hashing function (basic for now - should use bcryptjs in production)
function hashPassword(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

/**
 * Initialize database tables if they don't exist
 */
export async function initializeDatabase(): Promise<void> {
  try {
    // Create users table
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        phone TEXT,
        role TEXT NOT NULL DEFAULT 'client',
        profileImage TEXT,
        bio TEXT,
        location TEXT,
        latitude REAL,
        longitude REAL,
        isVerified TEXT DEFAULT 'false',
        isActive TEXT DEFAULT 'true',
        lastLogin TEXT,
        professionalDetails TEXT,
        clientPreferences TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `);

    console.log("✅ Database tables initialized successfully");
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
}

/**
 * Register a new user
 */
export async function signup(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}): Promise<User> {
  try {
    // Check if user already exists
    const existingUser = await turso.execute(
      "SELECT id FROM users WHERE email = ?",
      [data.email]
    );

    if (existingUser.rows.length > 0) {
      throw new Error("Email already registered");
    }

    // Hash password
    const hashedPassword = hashPassword(data.password);
    const now = new Date().toISOString();

    // Create user
    await turso.execute(
      `INSERT INTO users (
        email, password, firstName, lastName, role, 
        profileImage, isVerified, isActive, lastLogin, 
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.email,
        hashedPassword,
        data.firstName,
        data.lastName,
        data.role,
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
        "true",
        "true",
        now,
        now,
        now
      ]
    );

    // Fetch the created user
    const user = await getUserByEmail(data.email);
    if (!user) {
      throw new Error("Failed to create user");
    }

    return user;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}

/**
 * Login user
 */
export async function login(credentials: {
  email: string;
  password: string;
}): Promise<User> {
  try {
    // Find user by email
    const result = await turso.execute(
      "SELECT * FROM users WHERE email = ?",
      [credentials.email]
    );

    if (result.rows.length === 0) {
      throw new Error("Invalid email or password");
    }

    const userRow = result.rows[0] as any;

    // Verify password
    const hashedPassword = hashPassword(credentials.password);
    if (userRow.password !== hashedPassword) {
      throw new Error("Invalid email or password");
    }

    // Check if account is active
    if (userRow.isActive !== "true") {
      throw new Error("Account is deactivated");
    }

    // Update last login
    await turso.execute(
      "UPDATE users SET lastLogin = ? WHERE id = ?",
      [new Date().toISOString(), userRow.id]
    );

    // Return user object
    return rowToUser(userRow);
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await turso.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return rowToUser(result.rows[0] as any);
  } catch (error) {
    console.error("Get user by email error:", error);
    return null;
  }
}

/**
 * Get user by ID
 */
export async function getUserById(id: number): Promise<User | null> {
  try {
    const result = await turso.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return rowToUser(result.rows[0] as any);
  } catch (error) {
    console.error("Get user by ID error:", error);
    return null;
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  id: number,
  updates: Partial<User>
): Promise<User> {
  try {
    const now = new Date().toISOString();
    const fields: string[] = [];
    const values: any[] = [];

    // Build dynamic update query
    const allowedFields = [
      "firstName",
      "lastName",
      "phone",
      "profileImage",
      "bio",
      "location",
      "latitude",
      "longitude",
      "professionalDetails",
      "clientPreferences"
    ] as const;

    for (const field of allowedFields) {
      if (field in updates) {
        fields.push(`${field} = ?`);
        values.push((updates as any)[field]);
      }
    }

    if (fields.length === 0) {
      const user = await getUserById(id);
      if (!user) throw new Error("User not found");
      return user;
    }

    fields.push("updated_at = ?");
    values.push(now);
    values.push(id);

    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    await turso.execute(query, values);

    const user = await getUserById(id);
    if (!user) throw new Error("Failed to update user");

    return user;
  } catch (error) {
    console.error("Update user profile error:", error);
    throw error;
  }
}

/**
 * Reset password
 */
export async function resetPassword(
  email: string,
  newPassword: string
): Promise<void> {
  try {
    // Verify user exists
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    // Hash new password
    const hashedPassword = hashPassword(newPassword);

    // Update password
    await turso.execute(
      "UPDATE users SET password = ?, updated_at = ? WHERE email = ?",
      [hashedPassword, new Date().toISOString(), email]
    );
  } catch (error) {
    console.error("Reset password error:", error);
    throw error;
  }
}

/**
 * Verify user has specific role
 */
export function hasRole(user: User | null, role: UserRole | UserRole[]): boolean {
  if (!user) return false;
  const roles = Array.isArray(role) ? role : [role];
  return roles.includes(user.role);
}

/**
 * Convert database row to User object
 */
function rowToUser(row: any): User {
  return {
    id: row.id,
    email: row.email,
    password: row.password,
    firstName: row.firstName,
    lastName: row.lastName,
    phone: row.phone || "",
    role: row.role,
    profileImage: row.profileImage || "",
    bio: row.bio || "",
    location: row.location || "",
    latitude: row.latitude || 0,
    longitude: row.longitude || 0,
    isVerified: row.isVerified || "false",
    isActive: row.isActive || "true",
    lastLogin: row.lastLogin || "",
    professionalDetails: row.professionalDetails || "",
    clientPreferences: row.clientPreferences || "",
    created_at: row.created_at,
    updated_at: row.updated_at
  };
}
