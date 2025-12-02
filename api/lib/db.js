const { Pool } = require('pg');

let pool = null;

/**
 * Get PostgreSQL connection pool
 */
function getDbPool() {
  if (!pool) {
    const connectionString =
      process.env.POSTGRES_CONNECTION_STRING ||
      process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('No database connection string configured');
    }

    try {
      pool = new Pool({
        connectionString,
        ssl: {
          rejectUnauthorized: false // Required for Azure PostgreSQL
        }
      });
    } catch (error) {
      console.error('Failed to initialize database pool:', error);
      throw error;
    }
  }
  return pool;
}

/**
 * Execute a SQL query and return results
 */
async function executeQuery(sql, params = []) {
  try {
    const pool = getDbPool();
    const result = await pool.query(sql, params);
    return result.rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

module.exports = {
  getDbPool,
  executeQuery,
};
