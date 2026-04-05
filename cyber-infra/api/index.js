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

app.get('/', (req, res) => {
  res.send('Cyber Infra API is running');
});

// Placeholder for scanner routes
// e.g., app.use('/scan', scanRouter);

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
