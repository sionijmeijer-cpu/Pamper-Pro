import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { executeQuery } from "../lib/azureDbClient"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    const { method, body, id } = { method: req.method, body: req.body, id: req.query.id }

    if (method === 'GET') {
      if (id) {
        const result = await executeQuery('SELECT * FROM reviews WHERE id = $1', [id])
        context.res = { status: 200, body: result[0] || null }
      } else {
        const result = await executeQuery('SELECT * FROM reviews ORDER BY created_at DESC')
        context.res = { status: 200, body: result }
      }
    } else if (method === 'POST') {
      const { booking_id, client_id, professional_id, rating, comment } = body
      const result = await executeQuery(
        `INSERT INTO reviews (booking_id, client_id, professional_id, rating, comment) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [booking_id, client_id, professional_id, rating, comment]
      )
      context.res = { status: 201, body: result[0] }
    } else if (method === 'PUT') {
      const { rating, comment } = body
      const result = await executeQuery(
        `UPDATE reviews SET rating = COALESCE($1, rating), comment = COALESCE($2, comment),
         updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *`,
        [rating, comment, id]
      )
      context.res = { status: 200, body: result[0] }
    } else if (method === 'DELETE') {
      await executeQuery('DELETE FROM reviews WHERE id = $1', [id])
      context.res = { status: 204, body: null }
    }
  } catch (error) {
    context.res = { status: 500, body: { error: String(error) } }
  }
}

export default httpTrigger
