import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const body = req.body || null;

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: {
        success: true,
        message: "Test OK from /api/db-execute",
        received: body,
      },
    };
  } catch (error: any) {
    context.log.error("[db-execute] Error:", error);
    context.res = {
      status: 500,
      headers: { "Content-Type": "application/json" },
      body: {
        success: false,
        error: "db-execute failed",
        details: error?.message ?? String(error),
      },
    };
  }
};

export default httpTrigger;
