import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { executeQuery } from "../lib/azureDbClient"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    const { method, body, id } = { method: req.method, body: req.body, id: req.query.id }

    if (method === 'GET') {
      if (id) {
        const result = await executeQuery('SELECT * FROM payments WHERE id = $1', [id])
        context.res = { status: 200, body: result[0] || null }
      } else {
        const result = await executeQuery('SELECT * FROM payments ORDER BY created_at DESC')
        context.res = { status: 200, body: result }
      }
    } else if (method === 'POST') {
      const { booking_id, amount, status, payment_method, transaction_id } = body
      const result = await executeQuery(
        `INSERT INTO payments (booking_id, amount, status, payment_method, transaction_id) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [booking_id, amount, status || 'pending', payment_method, transaction_id]
      )
      context.res = { status: 201, body: result[0] }
    } else if (method === 'PUT') {
      const { status, transaction_id } = body
      const result = await executeQuery(
        `UPDATE payments SET status = COALESCE($1, status), transaction_id = COALESCE($2, transaction_id),
         updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *`,
        [status, transaction_id, id]
      )
      context.res = { status: 200, body: result[0] }
    } else if (method === 'DELETE') {
      await executeQuery('DELETE FROM payments WHERE id = $1', [id])
      context.res = { status: 204, body: null }
    }
  } catch (error) {
    context.res = { status: 500, body: { error: String(error) } }
  }
}

export default httpTrigger
