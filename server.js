const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Electrician Office AI static dashboard
app.use('/electrician', express.static(path.join(__dirname, 'electrician-office-ai/dashboard')));
// Cyber Infra static dashboard
app.use('/cyber', express.static(path.join(__dirname, 'cyber-infra/dashboard')));
// Healthcare Admin Tech static dashboard
app.use('/healthcare', express.static(path.join(__dirname, 'healthcare-admin-tech/dashboard')));

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

app.listen(PORT, () => {
  console.log(`Peake Technologies multi-app server listening on port ${PORT}`);
  console.log('Dashboards:');
  console.log(`  Electrician: http://localhost:${PORT}/electrician`);
  console.log(`  Cyber Infra: http://localhost:${PORT}/cyber`);
  console.log(`  Healthcare Admin Tech: http://localhost:${PORT}/healthcare`);
});
