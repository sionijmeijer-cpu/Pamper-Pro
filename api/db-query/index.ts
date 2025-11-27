import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { executeQuery } from "../lib/db";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const { sql, params } = req.body;

    if (!sql) {
      context.res = {
        status: 400,
        body: { error: "Missing SQL query" },
      };
      return;
    }

    // Execute the query
    const rows = await executeQuery(sql, params || []);

    context.res = {
      status: 200,
      body: { rows, success: true },
    };
  } catch (error: any) {
    console.error("[db-query] Error:", error);
    context.res = {
      status: 500,
      body: {
        error: error.message || "Database query failed",
        success: false,
      },
    };
  }
};

export default httpTrigger;
