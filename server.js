import express from 'express';
import dotenv from 'dotenv';
import data from './data.js';

const app = express();
app.use(express.json());

app.get('/api/products', (req, res) => {
  res.json(data.products);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
