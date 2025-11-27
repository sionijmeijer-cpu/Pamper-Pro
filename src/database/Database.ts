/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Database client that calls Azure Functions backend
 * All queries are routed through Azure Functions → CosmosDB PostgreSQL
 * This ensures credentials stay secure on the server
 */

const API_BASE = "/api";

async function callAzureFunction(
  functionName: string,
  method: string,
  data?: any
): Promise<any> {
  try {
    const response = await fetch(`${API_BASE}/${functionName}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Azure Function error: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`[Database] Error calling ${functionName}:`, error);
    throw error;
  }
}

export class Database {
  async query(sql: string, params?: any[]): Promise<any[]> {
    try {
      // Call the appropriate Azure Function based on SQL type
      const result = await callAzureFunction("db-query", "POST", {
        sql,
        params: params || [],
      });
      return result.rows || [];
    } catch (error) {
      console.error("[Database] Query error:", error);
      throw error;
    }
  }

  async run(sql: string, params?: any[]): Promise<void> {
    try {
      await callAzureFunction("db-execute", "POST", {
        sql,
        params: params || [],
      });
    } catch (error) {
      console.error("[Database] Run error:", error);
      throw error;
    }
  }

  async execute(
    sql: string,
    params?: any[]
  ): Promise<{ lastInsertRowid: bigint | undefined }> {
    try {
      const result = await callAzureFunction("db-execute", "POST", {
        sql,
        params: params || [],
      });
      return { lastInsertRowid: result.lastInsertRowid };
    } catch (error) {
      console.error("[Database] Execute error:", error);
      throw error;
    }
  }
}

export const db = new Database();
