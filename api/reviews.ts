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
      const { id, professional_id } = req.query;
      if (id) {
        const result = await query('SELECT * FROM reviews WHERE id = $1', [id]);
        res.status(200).json(result.rows[0]);
      } else if (professional_id) {
        const result = await query('SELECT * FROM reviews WHERE professional_id = $1 ORDER BY created_at DESC', [professional_id]);
        res.status(200).json(result.rows);
      } else {
        const result = await query('SELECT * FROM reviews ORDER BY created_at DESC');
        res.status(200).json(result.rows);
      }
    } else if (req.method === 'POST') {
      const { client_id, professional_id, booking_id, rating, comment } = req.body;
      const result = await query(
        'INSERT INTO reviews (client_id, professional_id, booking_id, rating, comment) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [client_id, professional_id, booking_id, rating, comment]
      );
      res.status(201).json(result.rows[0]);
    } else if (req.method === 'PUT') {
      const { id } = req.query;
      const { rating, comment } = req.body;
      const result = await query(
        'UPDATE reviews SET rating = $1, comment = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
        [rating, comment, id]
      );
      res.status(200).json(result.rows[0]);
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      await query('DELETE FROM reviews WHERE id = $1', [id]);
      res.status(204).end();
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
