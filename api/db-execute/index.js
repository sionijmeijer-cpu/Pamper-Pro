const { Client } = require('pg');

const executeQuery = async (sql, params = []) => {
  const client = new Client({
    connectionString: process.env.POSTGRES_CONNECTION_STRING,
  });

  try {
    await client.connect();
    const result = await client.query(sql, params);
    return result.rows;
  } finally {
    await client.end();
  }
};

module.exports = async function (context, req) {
  try {
    const { sql, params } = req.body;

    if (!sql) {
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          error: 'Missing SQL statement',
        }),
      };
      return;
    }

    // Execute the statement
    const result = await executeQuery(sql, params || []);

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: 'OK',
        changes: result.length || 0,
        lastInsertRowid: result[0]?.id,
        result: result,
      }),
    };
  } catch (error) {
    console.error('[db-execute] Error:', error);
    context.res = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        error: error.message || 'Database operation failed',
      }),
    };
  }
};
