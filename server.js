import express from 'express';
import dotenv from 'dotenv/config.js';
import connectDb from './config/db.js';
import seedRoutes from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import Async from './middleware/Async.js';
import errorHandler from './middleware/errorHandler.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to db
connectDb;

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID) || 'sb';
});

// seed router
app.use('/api/seed', seedRoutes);
// product router
app.use('/api/upload', uploadRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

// use middleware
app.use(Async);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});
