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
      const { id, user_id } = req.query;
      if (id) {
        const result = await query('SELECT * FROM clients WHERE id = $1', [id]);
        res.status(200).json(result.rows[0]);
      } else if (user_id) {
        const result = await query('SELECT * FROM clients WHERE user_id = $1', [user_id]);
        res.status(200).json(result.rows[0]);
      } else {
        const result = await query('SELECT * FROM clients ORDER BY created_at DESC');
        res.status(200).json(result.rows);
      }
    } else if (req.method === 'POST') {
      const { user_id, phone, address, hair_type, preferences } = req.body;
      const result = await query(
        'INSERT INTO clients (user_id, phone, address, hair_type, preferences) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [user_id, phone, address, hair_type, preferences]
      );
      res.status(201).json(result.rows[0]);
    } else if (req.method === 'PUT') {
      const { id } = req.query;
      const { phone, address, hair_type, preferences } = req.body;
      const result = await query(
        'UPDATE clients SET phone = $1, address = $2, hair_type = $3, preferences = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
        [phone, address, hair_type, preferences, id]
      );
      res.status(200).json(result.rows[0]);
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      await query('DELETE FROM clients WHERE id = $1', [id]);
      res.status(204).end();
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
