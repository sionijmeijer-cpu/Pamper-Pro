import { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@libsql/client";

// CORS headers
const setCorsHeaders = (res: VercelResponse) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
};

// Get Turso client (server-side only)
const getTursoClient = () => {
  const url = process.env.VITE_TURSO_DATABASE_URL;
  const token = process.env.VITE_TURSO_AUTH_TOKEN;

  if (!url) throw new Error("VITE_TURSO_DATABASE_URL not configured");
  if (!token) throw new Error("VITE_TURSO_AUTH_TOKEN not configured");

  return createClient({ url, authToken: token });
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed. Use POST" });
      return;
    }

    const { action, sql, params } = req.body;

    if (!action || !sql) {
      res.status(400).json({ error: "Missing 'action' or 'sql' parameter" });
      return;
    }

    const client = getTursoClient();

    if (action === "query") {
      const result = await client.execute({
        sql,
        args: params || [],
      });
      res.status(200).json({
        success: true,
        data: result.rows,
      });
    } else if (action === "execute") {
      const result = await client.execute({
        sql,
        args: params || [],
      });
      res.status(200).json({
        success: true,
        changes: result.changes,
        lastInsertRowid: result.lastInsertRowid,
      });
    } else {
      res.status(400).json({
        error: "Invalid action. Use 'query' or 'execute'",
      });
    }
  } catch (error: any) {
    console.error("Turso API error:", error);
    res.status(500).json({
      error: error?.message || "Database error",
      success: false,
    });
  }
}
