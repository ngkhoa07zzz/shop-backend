import express from 'express';
import data from '../data.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

const seedRoutes = express.Router();

seedRoutes.get('/', async (req, res) => {
  await Product.deleteMany({});
  const createdProduct = await Product.insertMany(data.products);

  await User.deleteMany({});
  const createdUser = await User.insertMany(data.users);
  res.send({ createdProduct, createdUser });
});

export default seedRoutes;
