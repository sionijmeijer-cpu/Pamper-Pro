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
      const { id, client_id, professional_id } = req.query;
      if (id) {
        const result = await query('SELECT * FROM bookings WHERE id = $1', [id]);
        res.status(200).json(result.rows[0]);
      } else if (client_id) {
        const result = await query('SELECT * FROM bookings WHERE client_id = $1 ORDER BY booking_date DESC', [client_id]);
        res.status(200).json(result.rows);
      } else if (professional_id) {
        const result = await query('SELECT * FROM bookings WHERE professional_id = $1 ORDER BY booking_date DESC', [professional_id]);
        res.status(200).json(result.rows);
      } else {
        const result = await query('SELECT * FROM bookings ORDER BY booking_date DESC');
        res.status(200).json(result.rows);
      }
    } else if (req.method === 'POST') {
      const { client_id, professional_id, service_id, booking_date, status, notes } = req.body;
      const result = await query(
        'INSERT INTO bookings (client_id, professional_id, service_id, booking_date, status, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [client_id, professional_id, service_id, booking_date, status || 'pending', notes]
      );
      res.status(201).json(result.rows[0]);
    } else if (req.method === 'PUT') {
      const { id } = req.query;
      const { status, notes } = req.body;
      const result = await query(
        'UPDATE bookings SET status = $1, notes = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
        [status, notes, id]
      );
      res.status(200).json(result.rows[0]);
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      await query('DELETE FROM bookings WHERE id = $1', [id]);
      res.status(204).end();
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
