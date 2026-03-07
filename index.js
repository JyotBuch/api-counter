const express = require('express');
const app = express();
app.use(express.json());

let count = 0;

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.get('/count', (req, res) => res.json({ count }));

app.post('/increment', (req, res) => {
  const amount = Number(req.body.amount ?? 1);
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'amount must be a positive number' });
  }
  count += amount;
  res.json({ count });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on ${PORT}`));

module.exports = app;