import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { executeQuery } from "../lib/azureDbClient";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const { sql, params } = req.body;

    if (!sql) {
      context.res = {
        status: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          success: false,
          error: "Missing SQL statement",
        }),
      };
      return;
    }

    // Execute the statement
    const result = await executeQuery(sql, params || []);

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        message: "OK",
        changes: result.length || 0,
        lastInsertRowid: result[0]?.id,
        result: result,
      }),
    };
  } catch (error: any) {
    console.error("[db-execute] Error:", error);
    context.res = {
      status: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: false,
        error: error.message || "Database operation failed",
      }),
    };
  }
};

export default httpTrigger;
