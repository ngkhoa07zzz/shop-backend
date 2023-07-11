import express from 'express';
import Async from '../middleware/Async.js';
import User from '../models/userModel.js';
import ApiError from '../utils/ApiError.js';
import { generateToken, isAuth } from '../utils/auth.js';
import Order from '../models/orderModel.js';

const orderRouter = express.Router();
orderRouter.post(
  '/',
  isAuth,
  Async(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = req.body;
    const order = await Order.create({
      orderItems: orderItems.map((item) => ({ ...item, product: item._id })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      user: req.user._id,
    });
    res.status(201).send({ message: 'New Order created', order });
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  Async(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (order) {
      res.status(200).send(order);
    } else {
      throw new ApiError(400, 'Order not found');
    }
  })
);
orderRouter.put(
  '/:id/pay',
  isAuth,
  Async(async (req, res) => {
    const { id } = req.params;
    const { status, update_time, email_address } = req.body;
    const order = await Order.findByIdAndUpdate(id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id,
        status,
        update_time,
        email_address,
      };
      res.send({ message: 'Order Paid', order: order });
    } else {
      throw new ApiError(404, 'Order not found!');
    }
  })
);

export default orderRouter;
