import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { executeQuery } from "../lib/azureDbClient"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    const { method, body, id } = { method: req.method, body: req.body, id: req.query.id }

    if (method === 'GET') {
      if (id) {
        const result = await executeQuery('SELECT * FROM bookings WHERE id = $1', [id])
        context.res = { status: 200, body: result[0] || null }
      } else {
        const result = await executeQuery('SELECT * FROM bookings ORDER BY booking_date DESC')
        context.res = { status: 200, body: result }
      }
    } else if (method === 'POST') {
      const { client_id, service_id, professional_id, booking_date, status, notes } = body
      const result = await executeQuery(
        `INSERT INTO bookings (client_id, service_id, professional_id, booking_date, status, notes) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [client_id, service_id, professional_id, booking_date, status || 'pending', notes]
      )
      context.res = { status: 201, body: result[0] }
    } else if (method === 'PUT') {
      const { status, notes } = body
      const result = await executeQuery(
        `UPDATE bookings SET status = COALESCE($1, status), notes = COALESCE($2, notes),
         updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *`,
        [status, notes, id]
      )
      context.res = { status: 200, body: result[0] }
    } else if (method === 'DELETE') {
      await executeQuery('DELETE FROM bookings WHERE id = $1', [id])
      context.res = { status: 204, body: null }
    }
  } catch (error) {
    context.res = { status: 500, body: { error: String(error) } }
  }
}

export default httpTrigger
