import { Pool } from '@neondatabase/serverless';

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.VITE_POSTGRES_HOST
      ? `postgresql://${process.env.VITE_POSTGRES_USER}:${process.env.VITE_POSTGRES_PASSWORD}@${process.env.VITE_POSTGRES_HOST}:${process.env.VITE_POSTGRES_PORT}/${process.env.VITE_POSTGRES_DATABASE}?sslmode=require`
      : process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('Database connection string not configured');
    }

    pool = new Pool({ connectionString });
  }

  return pool;
}

export async function query(text: string, params?: any[]) {
  const pool = getPool();
  const result = await pool.query(text, params);
  return result;
}
