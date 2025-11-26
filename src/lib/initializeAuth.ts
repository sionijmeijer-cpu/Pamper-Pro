import * as authService from "../services/authService";

/**
 * Initialize authentication system and seed demo users if needed
 */
export async function initializeAuthSystem(): Promise<void> {
  try {
    // Initialize database tables
    await authService.initializeDatabase();

    // Check if demo users exist
    const clientUser = await authService.getUserByEmail("client@test.com");

    if (!clientUser) {
      console.log("📝 Creating demo users...");

      try {
        await authService.signup({
          email: "client@test.com",
          password: "pass123",
          firstName: "John",
          lastName: "Client",
          role: "client"
        });
        console.log("✅ Client demo user created");
      } catch (error) {
        console.error("Failed to create client demo user:", error);
      }

      try {
        await authService.signup({
          email: "pro@test.com",
          password: "pass123",
          firstName: "Amaka",
          lastName: "Professional",
          role: "professional"
        });
        console.log("✅ Professional demo user created");
      } catch (error) {
        console.error("Failed to create professional demo user:", error);
      }

      try {
        await authService.signup({
          email: "admin@test.com",
          password: "pass123",
          firstName: "Admin",
          lastName: "User",
          role: "admin"
        });
        console.log("✅ Admin demo user created");
      } catch (error) {
        console.error("Failed to create admin demo user:", error);
      }

      console.log("✅ Demo users initialized in database");
    } else {
      console.log("✅ Demo users already exist in database");
    }
  } catch (error) {
    console.error("❌ Error initializing authentication system:", error);
  }
}
