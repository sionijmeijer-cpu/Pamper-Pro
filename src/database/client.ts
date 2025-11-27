import { createClient } from "@libsql/client";

// Get environment variables - throw error if missing (for reference/server-side only)
const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

// ⚠️ DO NOT USE THIS IN BROWSER CODE - It exposes VITE_TURSO_AUTH_TOKEN
// This is for development reference only. Use the /api/turso backend route instead.
let turso: ReturnType<typeof createClient> | null = null;

export function getTursoClient() {
  if (!turso) {
    turso = createClient({
      url: getEnvVar('VITE_TURSO_DATABASE_URL'),
      authToken: getEnvVar('VITE_TURSO_AUTH_TOKEN'),
    });
  }
  return turso;
}

export const database = getTursoClient();

export async function query(sql: string, params?: any[]): Promise<any> {
  try {
    const client = getTursoClient();
    const result = await client.execute({
      sql,
      args: params || [],
    });
    return result.rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export default database;
