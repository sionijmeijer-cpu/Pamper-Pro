import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { executeQuery } from "./lib/db";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const { sql, params } = req.body;

    if (!sql) {
      context.res = {
        status: 400,
        body: { error: "Missing SQL statement" },
      };
      return;
    }

    // Execute the statement
    const result = await executeQuery(sql, params || []);

    context.res = {
      status: 200,
      body: {
        success: true,
        changes: result.length || 0,
        lastInsertRowid: result[0]?.id, // For INSERT statements
      },
    };
  } catch (error: any) {
    console.error("[db-execute] Error:", error);
    context.res = {
      status: 500,
      body: {
        error: error.message || "Database operation failed",
        success: false,
      },
    };
  }
};

export default httpTrigger;
