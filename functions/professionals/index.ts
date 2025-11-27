import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { executeQuery } from "../lib/azureDbClient"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    const { method, body, id } = { method: req.method, body: req.body, id: req.query.id }

    if (method === 'GET') {
      if (id) {
        const result = await executeQuery('SELECT * FROM professionals WHERE id = $1', [id])
        context.res = { status: 200, body: result[0] || null }
      } else {
        const result = await executeQuery('SELECT * FROM professionals ORDER BY created_at DESC')
        context.res = { status: 200, body: result }
      }
    } else if (method === 'POST') {
      const { user_id, business_name, phone, bio, avatar_url } = body
      const result = await executeQuery(
        `INSERT INTO professionals (user_id, business_name, phone, bio, avatar_url) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [user_id, business_name, phone, bio, avatar_url]
      )
      context.res = { status: 201, body: result[0] }
    } else if (method === 'PUT') {
      const { business_name, phone, bio, avatar_url, rating } = body
      const result = await executeQuery(
        `UPDATE professionals SET business_name = COALESCE($1, business_name), phone = COALESCE($2, phone), 
         bio = COALESCE($3, bio), avatar_url = COALESCE($4, avatar_url), rating = COALESCE($5, rating),
         updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *`,
        [business_name, phone, bio, avatar_url, rating, id]
      )
      context.res = { status: 200, body: result[0] }
    } else if (method === 'DELETE') {
      await executeQuery('DELETE FROM professionals WHERE id = $1', [id])
      context.res = { status: 204, body: null }
    }
  } catch (error) {
    context.res = { status: 500, body: { error: String(error) } }
  }
}

export default httpTrigger
