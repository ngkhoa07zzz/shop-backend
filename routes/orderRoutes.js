import express from 'express';

import { isAdmin, isAuth } from '../utils/auth.js';

import {
  createOrder,
  getMyOrders,
  getOrder,
  listOrder,
  payOrder,
  summaryData,
} from '../controllers/orderControllers.js';

const orderRouter = express.Router();

orderRouter.post('/', isAuth, createOrder);
orderRouter.get('/', isAuth, isAdmin, listOrder);

orderRouter.get('/summary', isAuth, isAdmin, summaryData);

orderRouter.get('/mine', isAuth, getMyOrders);

orderRouter.get('/:id', isAuth, getOrder);

orderRouter.put('/:id/pay', isAuth, payOrder);

export default orderRouter;
