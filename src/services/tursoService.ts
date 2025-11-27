// Frontend service - calls backend /api/turso instead of connecting to Turso directly
// This keeps VITE_TURSO_AUTH_TOKEN secure on the server

const API_BASE = "/api";

export const tursoService = {
  async query(sql: string, params?: any[]): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE}/turso`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "query",
          sql,
          params,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || "Query failed");
      }

      return result.data;
    } catch (error) {
      console.error("Turso query error:", error);
      throw error;
    }
  },

  async execute(sql: string, params?: any[]): Promise<{ changes: number; lastInsertRowid?: number }> {
    try {
      const response = await fetch(`${API_BASE}/turso`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "execute",
          sql,
          params,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || "Execute failed");
      }

      return {
        changes: result.changes,
        lastInsertRowid: result.lastInsertRowid,
      };
    } catch (error) {
      console.error("Turso execute error:", error);
      throw error;
    }
  },
};

export default tursoService;
