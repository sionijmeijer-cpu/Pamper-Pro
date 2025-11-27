import { neon } from "@neondatabase/serverless";

let dbClient: any = null;

/**
 * Get PostgreSQL database client
 * Supports both CosmosDB PostgreSQL and regular PostgreSQL via environment variables
 */
function getDbClient() {
  if (!dbClient) {
    const connectionString =
      process.env.COSMOSDB_CONNECTION_STRING ||
      process.env.DATABASE_URL ||
      process.env.VITE_DATABASE_URL;

    if (!connectionString) {
      throw new Error("No database connection string configured");
    }

    try {
      // Use @neondatabase/serverless for serverless connection pooling
      dbClient = neon(connectionString);
    } catch (error) {
      console.error("Failed to initialize database client:", error);
      throw error;
    }
  }
  return dbClient;
}

/**
 * Execute a SQL query and return results
 */
export async function executeQuery(sql: string, params: any[] = []) {
  try {
    const db = getDbClient();
    const result = await db(sql, params);
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

/**
 * Health check for database connection
 */
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    const db = getDbClient();
    await db("SELECT 1");
    return true;
  } catch (error) {
    console.error("Database health check failed:", error);
    return false;
  }
}
