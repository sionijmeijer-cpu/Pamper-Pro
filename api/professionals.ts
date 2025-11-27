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
        const result = await query('SELECT * FROM professionals WHERE id = $1', [id]);
        res.status(200).json(result.rows[0]);
      } else if (user_id) {
        const result = await query('SELECT * FROM professionals WHERE user_id = $1', [user_id]);
        res.status(200).json(result.rows[0]);
      } else {
        const result = await query('SELECT * FROM professionals ORDER BY created_at DESC');
        res.status(200).json(result.rows);
      }
    } else if (req.method === 'POST') {
      const { user_id, phone, specializations, experience_years, business_name } = req.body;
      const result = await query(
        'INSERT INTO professionals (user_id, phone, specializations, experience_years, business_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [user_id, phone, specializations, experience_years, business_name]
      );
      res.status(201).json(result.rows[0]);
    } else if (req.method === 'PUT') {
      const { id } = req.query;
      const { phone, specializations, experience_years, business_name } = req.body;
      const result = await query(
        'UPDATE professionals SET phone = $1, specializations = $2, experience_years = $3, business_name = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
        [phone, specializations, experience_years, business_name, id]
      );
      res.status(200).json(result.rows[0]);
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      await query('DELETE FROM professionals WHERE id = $1', [id]);
      res.status(204).end();
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
