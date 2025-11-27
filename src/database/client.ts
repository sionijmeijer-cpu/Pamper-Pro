import { createClient } from "@libsql/client";

const turso = createClient({
  url: import.meta.env.VITE_TURSO_DATABASE_URL || "",
  authToken: import.meta.env.VITE_TURSO_AUTH_TOKEN || "",
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
