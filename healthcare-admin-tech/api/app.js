const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.static(path.join(__dirname, '../dashboard')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'healthcare-admin-tech' });
});

app.listen(PORT, () => {
  console.log(`Healthcare Admin Tech app listening on port ${PORT}`);
});
