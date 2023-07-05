import express from 'express';
import dotenv from 'dotenv/config.js';
import connectDb from './config/db.js';
import seedRoutes from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import Async from './middleware/Async.js';
import errorHandler from './middleware/errorHandler.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to db
connectDb;

// seed router
app.use('/api/seed', seedRoutes);
// product router
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

// use middleware
app.use(Async);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});
