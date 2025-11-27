import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { executeQuery } from "../lib/azureDbClient"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    const { method, body, id } = {
      method: req.method,
      body: req.body,
      id: req.query.id
    }

    if (method === 'GET') {
      if (id) {
        const result = await executeQuery('SELECT * FROM users WHERE id = $1', [id])
        context.res = { status: 200, body: result[0] || null }
      } else {
        const result = await executeQuery('SELECT * FROM users ORDER BY created_at DESC')
        context.res = { status: 200, body: result }
      }
    } else if (method === 'POST') {
      const { email, password_hash, full_name, user_type } = body
      const result = await executeQuery(
        `INSERT INTO users (email, password_hash, full_name, user_type) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [email, password_hash, full_name, user_type]
      )
      context.res = { status: 201, body: result[0] }
    } else if (method === 'PUT') {
      const { email, full_name, is_verified } = body
      const result = await executeQuery(
        `UPDATE users SET email = COALESCE($1, email), full_name = COALESCE($2, full_name), 
         is_verified = COALESCE($3, is_verified), updated_at = CURRENT_TIMESTAMP 
         WHERE id = $4 RETURNING *`,
        [email, full_name, is_verified, id]
      )
      context.res = { status: 200, body: result[0] }
    } else if (method === 'DELETE') {
      await executeQuery('DELETE FROM users WHERE id = $1', [id])
      context.res = { status: 204, body: null }
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: { error: String(error) }
    }
  }
}

export default httpTrigger
