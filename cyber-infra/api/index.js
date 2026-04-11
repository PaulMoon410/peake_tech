import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import { getDb } from './db.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


// Database selection logic
let usePostgres = false;
let pool = null;
if (process.env.DATABASE_URL) {
  usePostgres = true;
  pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
}


import scanRouter from './scanRouter.js';

app.get('/', (req, res) => {
  res.send('Cyber Infra API is running');
});

// Scanner routes

// API endpoints for dashboard
app.get('/api/alerts', async (req, res) => {
  try {
    if (usePostgres) {
      const result = await pool.query('SELECT * FROM alerts');
      res.json({ alerts: result.rows });
    } else {
      const db = await getDb();
      const alerts = await db.all('SELECT * FROM alerts');
      res.json({ alerts });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch alerts', details: err.message });
  }
});

app.get('/api/incidents', async (req, res) => {
  try {
    if (usePostgres) {
      const result = await pool.query('SELECT * FROM incidents');
      res.json({ incidents: result.rows });
    } else {
      const db = await getDb();
      const incidents = await db.all('SELECT * FROM incidents');
      res.json({ incidents });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch incidents', details: err.message });
  }
});

app.get('/api/analytics', async (req, res) => {
  try {
    if (usePostgres) {
      const result = await pool.query('SELECT type, COUNT(*) as count FROM alerts GROUP BY type');
      const rows = result.rows;
      const labels = rows.map(r => r.type);
      const values = rows.map(r => r.count);
      res.json({ data: { labels, values } });
    } else {
      const db = await getDb();
      const rows = await db.all('SELECT type, COUNT(*) as count FROM alerts GROUP BY type');
      const labels = rows.map(r => r.type);
      const values = rows.map(r => r.count);
      res.json({ data: { labels, values } });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics', details: err.message });
  }
});

app.get('/api/auth/me', (req, res) => {
  // TODO: Replace with real auth logic
  res.json({ user: { id: 1, name: 'Demo User', role: 'admin' } });
});

app.use('/scan', scanRouter);

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
