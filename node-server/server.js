const express = require('express');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL pool setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/cyberinfra',
});

app.use(express.json());

// Electrician Office AI static dashboard
const electricianDashboardPath = path.join(__dirname, '../electrician-office-ai/dashboard');
app.use('/electrician/static', express.static(path.join(electricianDashboardPath, 'static')));
app.use('/electrician/manifest.json', (req, res) => {
  res.sendFile(path.join(electricianDashboardPath, 'manifest.json'));
});
app.use('/electrician/logo192.png', (req, res) => {
  res.sendFile(path.join(electricianDashboardPath, 'logo192.png'));
});
app.use('/electrician/logo512.png', (req, res) => {
  res.sendFile(path.join(electricianDashboardPath, 'logo512.png'));
});
app.use('/electrician/favicon.ico', (req, res) => {
  res.sendFile(path.join(electricianDashboardPath, 'favicon.ico'));
});
// Serve index.html for Electrician base path
app.get('/electrician', (req, res) => {
  res.sendFile(path.join(electricianDashboardPath, 'index.html'));
});
// Catch-all route for Electrician React app
app.get('/electrician/*', (req, res) => {
  res.sendFile(path.join(electricianDashboardPath, 'index.html'));
});
// Cyber Infra static dashboard
const cyberDashboardPath = path.join(__dirname, '../cyber-infra/dashboard');
app.use('/cyber/static', express.static(path.join(cyberDashboardPath, 'static')));
app.use('/cyber/manifest.json', (req, res) => {
  res.sendFile(path.join(cyberDashboardPath, 'manifest.json'));
});
app.use('/cyber/logo192.png', (req, res) => {
  res.sendFile(path.join(cyberDashboardPath, 'logo192.png'));
});
app.use('/cyber/logo512.png', (req, res) => {
  res.sendFile(path.join(cyberDashboardPath, 'logo512.png'));
});
app.use('/cyber/favicon.ico', (req, res) => {
  res.sendFile(path.join(cyberDashboardPath, 'favicon.ico'));
});
// Serve index.html for Cyber base path
app.get('/cyber', (req, res) => {
  res.sendFile(path.join(cyberDashboardPath, 'index.html'));
});
// Catch-all route for Cyber React app
app.get('/cyber/*', (req, res) => {
  res.sendFile(path.join(cyberDashboardPath, 'index.html'));
});
// Healthcare Admin Tech static dashboard
const healthcareDashboardPath = path.join(__dirname, '../healthcare-admin-tech/dashboard');
app.use('/healthcare/static', express.static(path.join(healthcareDashboardPath, 'static')));
app.use('/healthcare/manifest.json', (req, res) => {
  res.sendFile(path.join(healthcareDashboardPath, 'manifest.json'));
});
app.use('/healthcare/logo192.png', (req, res) => {
  res.sendFile(path.join(healthcareDashboardPath, 'logo192.png'));
});
app.use('/healthcare/logo512.png', (req, res) => {
  res.sendFile(path.join(healthcareDashboardPath, 'logo512.png'));
});
app.use('/healthcare/favicon.ico', (req, res) => {
  res.sendFile(path.join(healthcareDashboardPath, 'favicon.ico'));
});
// Serve index.html for Healthcare base path
app.get('/healthcare', (req, res) => {
  res.sendFile(path.join(healthcareDashboardPath, 'index.html'));
});
// Catch-all route for Healthcare React app
app.get('/healthcare/*', (req, res) => {
  res.sendFile(path.join(healthcareDashboardPath, 'index.html'));
});

// Health endpoints for each app
app.get('/api/electrician/health', (req, res) => {
  res.json({ status: 'ok', app: 'electrician-office-ai' });
});
app.get('/api/cyber/health', (req, res) => {
  res.json({ status: 'ok', app: 'cyber-infra' });
});
app.get('/api/healthcare/health', (req, res) => {
  res.json({ status: 'ok', app: 'healthcare-admin-tech' });
});



// --- Cyber Infra Dashboard API endpoints ---

// GET /api/alerts?severity=high&status=blocked&sourceIp=...&timeRange=24h
app.get('/api/alerts', async (req, res) => {
  try {
    const { severity, status, sourceIp, timeRange } = req.query;
    let query = 'SELECT * FROM alerts WHERE 1=1';
    const params = [];
    if (severity) { params.push(severity); query += ` AND severity = $${params.length}`; }
    if (status) { params.push(status); query += ` AND status = $${params.length}`; }
    if (sourceIp) { params.push(sourceIp); query += ` AND (ip = $${params.length} OR source_ip = $${params.length})`; }
    if (timeRange) {
      // timeRange: '15m', '1h', '24h', '7d'
      const now = new Date();
      let ms = 0;
      if (timeRange === '15m') ms = 15 * 60 * 1000;
      else if (timeRange === '1h') ms = 60 * 60 * 1000;
      else if (timeRange === '24h') ms = 24 * 60 * 60 * 1000;
      else if (timeRange === '7d') ms = 7 * 24 * 60 * 60 * 1000;
      if (ms > 0) {
        params.push(new Date(now - ms));
        query += ` AND timestamp >= $${params.length}`;
      }
    }
    query += ' ORDER BY timestamp DESC LIMIT 200';
    const { rows } = await pool.query(query, params);
    res.json({ alerts: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/incidents?status=open&severity=critical&timeRange=24h
app.get('/api/incidents', async (req, res) => {
  try {
    const { status, severity, timeRange, bucket } = req.query;
    let query = 'SELECT * FROM incidents WHERE 1=1';
    const params = [];
    if (status) { params.push(status); query += ` AND status = $${params.length}`; }
    if (severity) { params.push(severity); query += ` AND severity = $${params.length}`; }
    if (bucket) { params.push(bucket); query += ` AND bucket = $${params.length}`; }
    if (timeRange) {
      const now = new Date();
      let ms = 0;
      if (timeRange === '15m') ms = 15 * 60 * 1000;
      else if (timeRange === '1h') ms = 60 * 60 * 1000;
      else if (timeRange === '24h') ms = 24 * 60 * 60 * 1000;
      else if (timeRange === '7d') ms = 7 * 24 * 60 * 60 * 1000;
      if (ms > 0) {
        params.push(new Date(now - ms));
        query += ` AND timestamp >= $${params.length}`;
      }
    }
    query += ' ORDER BY timestamp DESC LIMIT 200';
    const { rows } = await pool.query(query, params);
    res.json({ incidents: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/analytics?metric=top_source_ips&timeRange=24h
app.get('/api/analytics', async (req, res) => {
  try {
    const { metric, timeRange } = req.query;
    let result = { labels: [], values: [] };
    if (metric === 'top_source_ips') {
      let query = 'SELECT source_ip, COUNT(*) as count FROM alerts WHERE 1=1';
      const params = [];
      if (timeRange) {
        const now = new Date();
        let ms = 0;
        if (timeRange === '15m') ms = 15 * 60 * 1000;
        else if (timeRange === '1h') ms = 60 * 60 * 1000;
        else if (timeRange === '24h') ms = 24 * 60 * 60 * 1000;
        else if (timeRange === '7d') ms = 7 * 24 * 60 * 60 * 1000;
        if (ms > 0) {
          params.push(new Date(now - ms));
          query += ` AND timestamp >= $${params.length}`;
        }
      }
      query += ' GROUP BY source_ip ORDER BY count DESC LIMIT 10';
      const { rows } = await pool.query(query, params);
      result.labels = rows.map(r => r.source_ip);
      result.values = rows.map(r => parseInt(r.count));
    } else if (metric === 'blocked_vs_allowed') {
      let query = 'SELECT status, COUNT(*) as count FROM alerts WHERE 1=1';
      const params = [];
      if (timeRange) {
        const now = new Date();
        let ms = 0;
        if (timeRange === '15m') ms = 15 * 60 * 1000;
        else if (timeRange === '1h') ms = 60 * 60 * 1000;
        else if (timeRange === '24h') ms = 24 * 60 * 60 * 1000;
        else if (timeRange === '7d') ms = 7 * 24 * 60 * 60 * 1000;
        if (ms > 0) {
          params.push(new Date(now - ms));
          query += ` AND timestamp >= $${params.length}`;
        }
      }
      query += ' GROUP BY status';
      const { rows } = await pool.query(query, params);
      result.blocked = 0;
      result.allowed = 0;
      rows.forEach(r => {
        if (r.status === 'blocked') result.blocked = parseInt(r.count);
        if (r.status === 'allowed') result.allowed = parseInt(r.count);
      });
    } else if (metric === 'incidents_opened_resolved') {
      let query = 'SELECT bucket, status, COUNT(*) as count FROM incidents WHERE 1=1';
      const params = [];
      if (timeRange) {
        const now = new Date();
        let ms = 0;
        if (timeRange === '15m') ms = 15 * 60 * 1000;
        else if (timeRange === '1h') ms = 60 * 60 * 1000;
        else if (timeRange === '24h') ms = 24 * 60 * 60 * 1000;
        else if (timeRange === '7d') ms = 7 * 24 * 60 * 60 * 1000;
        if (ms > 0) {
          params.push(new Date(now - ms));
          query += ` AND timestamp >= $${params.length}`;
        }
      }
      query += ' GROUP BY bucket, status ORDER BY bucket';
      const { rows } = await pool.query(query, params);
      // Assume bucket is a time bucket label (e.g., '2026-04-06 13:00')
      const buckets = [...new Set(rows.map(r => r.bucket))];
      result.labels = buckets;
      result.opened = buckets.map(b => {
        const row = rows.find(r => r.bucket === b && r.status === 'open');
        return row ? parseInt(row.count) : 0;
      });
      result.resolved = buckets.map(b => {
        const row = rows.find(r => r.bucket === b && r.status === 'resolved');
        return row ? parseInt(row.count) : 0;
      });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/auth/me (stub, real auth not implemented)
app.get('/api/auth/me', (req, res) => {
  // TODO: Implement real authentication
  res.json({ user: { id: 1, name: 'Demo User', role: 'admin' } });
});

app.listen(PORT, () => {
  console.log(`Peake Technologies multi-app server listening on port ${PORT}`);
  console.log('Dashboards:');
  console.log(`  Electrician: http://localhost:${PORT}/electrician`);
  console.log(`  Cyber Infra: http://localhost:${PORT}/cyber`);
  console.log(`  Healthcare Admin Tech: http://localhost:${PORT}/healthcare`);
});
