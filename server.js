import express from 'express';
import dotenv from 'dotenv/config.js';
import data from './data.js';
import connectDb from './config/db.js';
import seedRoutes from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
// app.use(express.json());

// connect to db
connectDb;

// seed router
app.use('/api/seed', seedRoutes);
// product router
app.use('/api/products', productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});
