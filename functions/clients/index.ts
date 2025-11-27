import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { executeQuery } from "../lib/azureDbClient"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    const { method, body, id } = { method: req.method, body: req.body, id: req.query.id }

    if (method === 'GET') {
      if (id) {
        const result = await executeQuery('SELECT * FROM clients WHERE id = $1', [id])
        context.res = { status: 200, body: result[0] || null }
      } else {
        const result = await executeQuery('SELECT * FROM clients ORDER BY created_at DESC')
        context.res = { status: 200, body: result }
      }
    } else if (method === 'POST') {
      const { user_id, phone, preferences, avatar_url } = body
      const result = await executeQuery(
        `INSERT INTO clients (user_id, phone, preferences, avatar_url) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [user_id, phone, preferences, avatar_url]
      )
      context.res = { status: 201, body: result[0] }
    } else if (method === 'PUT') {
      const { phone, preferences, avatar_url } = body
      const result = await executeQuery(
        `UPDATE clients SET phone = COALESCE($1, phone), preferences = COALESCE($2, preferences), 
         avatar_url = COALESCE($3, avatar_url), updated_at = CURRENT_TIMESTAMP 
         WHERE id = $4 RETURNING *`,
        [phone, preferences, avatar_url, id]
      )
      context.res = { status: 200, body: result[0] }
    } else if (method === 'DELETE') {
      await executeQuery('DELETE FROM clients WHERE id = $1', [id])
      context.res = { status: 204, body: null }
    }
  } catch (error) {
    context.res = { status: 500, body: { error: String(error) } }
  }
}

export default httpTrigger
