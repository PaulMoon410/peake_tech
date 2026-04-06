const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.static(path.join(__dirname, '../dashboard')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'cyber-infra' });
});

app.listen(PORT, () => {
  console.log(`Cyber Infra app listening on port ${PORT}`);
});
