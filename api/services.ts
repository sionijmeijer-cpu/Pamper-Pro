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
        const result = await query('SELECT * FROM services WHERE id = $1', [id]);
        res.status(200).json(result.rows[0]);
      } else if (professional_id) {
        const result = await query('SELECT * FROM services WHERE professional_id = $1 ORDER BY created_at DESC', [professional_id]);
        res.status(200).json(result.rows);
      } else {
        const result = await query('SELECT * FROM services ORDER BY created_at DESC');
        res.status(200).json(result.rows);
      }
    } else if (req.method === 'POST') {
      const { professional_id, name, description, price, duration_minutes, category } = req.body;
      const result = await query(
        'INSERT INTO services (professional_id, name, description, price, duration_minutes, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [professional_id, name, description, price, duration_minutes, category]
      );
      res.status(201).json(result.rows[0]);
    } else if (req.method === 'PUT') {
      const { id } = req.query;
      const { name, description, price, duration_minutes, category } = req.body;
      const result = await query(
        'UPDATE services SET name = $1, description = $2, price = $3, duration_minutes = $4, category = $5, updated_at = NOW() WHERE id = $6 RETURNING *',
        [name, description, price, duration_minutes, category, id]
      );
      res.status(200).json(result.rows[0]);
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      await query('DELETE FROM services WHERE id = $1', [id]);
      res.status(204).end();
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
