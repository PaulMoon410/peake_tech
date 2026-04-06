import express from 'express';
import { scanWebsite } from '../../workflows/websiteScanner.js';

const router = express.Router();

// POST /scan/website
router.post('/website', async (req, res) => {
  const { url } = req.body;
  try {
    const result = await scanWebsite(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
