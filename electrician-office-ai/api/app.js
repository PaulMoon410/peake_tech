const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '../dashboard')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'electrician-office-ai' });
});

app.listen(PORT, () => {
  console.log(`Electrician Office AI app listening on port ${PORT}`);
});
