import { createClient } from "@libsql/client";

// Read from window.__CONFIG__ (injected by Azure) or fallback to import.meta.env
const getEnvVar = (key: string): string => {
  // First try runtime config from window
  if (typeof window !== 'undefined' && (window as any).__CONFIG__) {
    return (window as any).__CONFIG__[key] || '';
  }
  // Then try import.meta.env (for local development)
  return import.meta.env[key] || '';
};

const turso = createClient({
  url: getEnvVar('VITE_TURSO_DATABASE_URL'),
  authToken: getEnvVar('VITE_TURSO_AUTH_TOKEN'),
});

export const database = turso;

export async function query(sql: string, params?: any[]): Promise<any> {
  try {
    const result = await turso.execute({
      sql,
      args: params || [],
    });
    return result.rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export default turso;
