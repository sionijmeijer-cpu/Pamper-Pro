const { neon } = require('@neondatabase/serverless');

let dbClient = null;

/**
 * Get PostgreSQL database client
 */
function getDbClient() {
  if (!dbClient) {
    const connectionString =
      process.env.COSMOSDB_CONNECTION_STRING ||
      process.env.DATABASE_URL ||
      process.env.VITE_DATABASE_URL;

    if (!connectionString) {
      throw new Error('No database connection string configured');
    }

    try {
      dbClient = neon(connectionString);
    } catch (error) {
      console.error('Failed to initialize database client:', error);
      throw error;
    }
  }
  return dbClient;
}

/**
 * Execute a SQL query and return results
 */
async function executeQuery(sql, params = []) {
  try {
    const db = getDbClient();
    const result = await db(sql, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

module.exports = {
  getDbClient,
  executeQuery,
};
