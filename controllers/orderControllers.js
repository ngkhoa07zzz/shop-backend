import Async from '../middleware/Async.js';
import User from '../models/userModel.js';
import ApiError from '../utils/ApiError.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

// @desc Create order
// @route POST /api/orders/
// @access private
const createOrder = Async(async (req, res) => {
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
  res.status(201).json({ message: 'New Order created', order });
});

// @desc Dashboard
// @route GET /api/orders/summary
// @access private
const summaryData = Async(async (req, res) => {
  const orders = await Order.aggregate([
    {
      $group: {
        _id: null,
        numOrders: { $sum: 1 },
        totalSales: { $sum: '$totalPrice' },
      },
    },
  ]);
  const users = await User.aggregate([
    {
      $group: {
        _id: null,
        numUsers: { $sum: 1 },
      },
    },
  ]);
  const dailyOrders = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        orders: { $sum: 1 },
        sales: { $sum: '$totalPrice' },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  const productCategories = await Product.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
  ]);
  res.json({ users, orders, dailyOrders, productCategories });
});

// @desc All my orders
// @route GET /api/orders/mine
// @access private
const getMyOrders = Async(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc View order
// @route GET /api/orders/:id
// @access private
const getOrder = Async(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (order) {
    res.status(200).json(order);
  } else {
    throw new ApiError(400, 'Order not found');
  }
});

// @desc Pay order
// @route PUT /api/orders/:id/pay
// @access private
const payOrder = Async(async (req, res) => {
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
    res.json({ message: 'Order Paid', order: order });
  } else {
    throw new ApiError(404, 'Order not found!');
  }
});
export { createOrder, summaryData, getMyOrders, getOrder, payOrder };
