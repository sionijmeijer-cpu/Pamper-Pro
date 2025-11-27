import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { initializeDatabase } from "../lib/azureDbClient"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    await initializeDatabase()
    context.res = {
      status: 200,
      body: { success: true, message: "Database initialized successfully" }
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: { success: false, error: String(error) }
    }
  }
}

export default httpTrigger
