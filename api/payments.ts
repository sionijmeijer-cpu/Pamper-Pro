import { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from './lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      const { id, booking_id, client_id } = req.query;
      if (id) {
        const result = await query('SELECT * FROM payments WHERE id = $1', [id]);
        res.status(200).json(result.rows[0]);
      } else if (booking_id) {
        const result = await query('SELECT * FROM payments WHERE booking_id = $1 ORDER BY created_at DESC', [booking_id]);
        res.status(200).json(result.rows);
      } else if (client_id) {
        const result = await query('SELECT * FROM payments WHERE client_id = $1 ORDER BY created_at DESC', [client_id]);
        res.status(200).json(result.rows);
      } else {
        const result = await query('SELECT * FROM payments ORDER BY created_at DESC');
        res.status(200).json(result.rows);
      }
    } else if (req.method === 'POST') {
      const { booking_id, client_id, amount, status, payment_method } = req.body;
      const result = await query(
        'INSERT INTO payments (booking_id, client_id, amount, status, payment_method) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [booking_id, client_id, amount, status || 'pending', payment_method]
      );
      res.status(201).json(result.rows[0]);
    } else if (req.method === 'PUT') {
      const { id } = req.query;
      const { status, payment_method } = req.body;
      const result = await query(
        'UPDATE payments SET status = $1, payment_method = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
        [status, payment_method, id]
      );
      res.status(200).json(result.rows[0]);
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      await query('DELETE FROM payments WHERE id = $1', [id]);
      res.status(204).end();
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
