import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { executeQuery } from "../lib/azureDbClient"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    const { method, body, id } = { method: req.method, body: req.body, id: req.query.id }

    if (method === 'GET') {
      if (id) {
        const result = await executeQuery('SELECT * FROM services WHERE id = $1', [id])
        context.res = { status: 200, body: result[0] || null }
      } else {
        const result = await executeQuery('SELECT * FROM services ORDER BY created_at DESC')
        context.res = { status: 200, body: result }
      }
    } else if (method === 'POST') {
      const { professional_id, name, description, price, duration_minutes, category } = body
      const result = await executeQuery(
        `INSERT INTO services (professional_id, name, description, price, duration_minutes, category) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [professional_id, name, description, price, duration_minutes, category]
      )
      context.res = { status: 201, body: result[0] }
    } else if (method === 'PUT') {
      const { name, description, price, duration_minutes, category } = body
      const result = await executeQuery(
        `UPDATE services SET name = COALESCE($1, name), description = COALESCE($2, description),
         price = COALESCE($3, price), duration_minutes = COALESCE($4, duration_minutes),
         category = COALESCE($5, category), updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *`,
        [name, description, price, duration_minutes, category, id]
      )
      context.res = { status: 200, body: result[0] }
    } else if (method === 'DELETE') {
      await executeQuery('DELETE FROM services WHERE id = $1', [id])
      context.res = { status: 204, body: null }
    }
  } catch (error) {
    context.res = { status: 500, body: { error: String(error) } }
  }
}

export default httpTrigger
