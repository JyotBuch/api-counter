const express = require('express');
const app = express();
app.use(express.json());

let count = 0;

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.get('/count', (req, res) => res.json({ count }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on ${PORT}`));

module.exports = app;