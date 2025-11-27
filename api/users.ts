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
      const { id } = req.query;
      if (id) {
        const result = await query('SELECT * FROM users WHERE id = $1', [id]);
        res.status(200).json(result.rows[0]);
      } else {
        const result = await query('SELECT * FROM users ORDER BY created_at DESC');
        res.status(200).json(result.rows);
      }
    } else if (req.method === 'POST') {
      const { email, password_hash, full_name, user_type, verified } = req.body;
      const result = await query(
        'INSERT INTO users (email, password_hash, full_name, user_type, verified) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [email, password_hash, full_name, user_type, verified || false]
      );
      res.status(201).json(result.rows[0]);
    } else if (req.method === 'PUT') {
      const { id } = req.query;
      const { email, full_name, user_type, verified } = req.body;
      const result = await query(
        'UPDATE users SET email = $1, full_name = $2, user_type = $3, verified = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
        [email, full_name, user_type, verified, id]
      );
      res.status(200).json(result.rows[0]);
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      await query('DELETE FROM users WHERE id = $1', [id]);
      res.status(204).end();
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
