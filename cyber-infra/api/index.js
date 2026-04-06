import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// PostgreSQL pool setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


import scanRouter from './scanRouter.js';

app.get('/', (req, res) => {
  res.send('Cyber Infra API is running');
});

// Scanner routes

// API endpoints for dashboard
app.get('/api/alerts', (req, res) => {
  // TODO: Replace with real DB query
  res.json({ alerts: [] });
});

app.get('/api/incidents', (req, res) => {
  // TODO: Replace with real DB query
  res.json({ incidents: [] });
});

app.get('/api/analytics', (req, res) => {
  // TODO: Replace with real analytics logic
  res.json({ data: { labels: [], values: [] } });
});

app.get('/api/auth/me', (req, res) => {
  // TODO: Replace with real auth logic
  res.json({ user: { id: 1, name: 'Demo User', role: 'admin' } });
});

app.use('/scan', scanRouter);

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
