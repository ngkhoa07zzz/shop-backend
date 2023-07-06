import express from 'express';
import data from '../data.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

const seedRoutes = express.Router();

seedRoutes.get('/', async (req, res) => {
  await User.deleteMany({});
  await Product.deleteMany({});
  await User.collection.dropIndexes();
  await Product.collection.dropIndexes();
  const createdUsers = await User.insertMany(data.users);
  const createdProducts = await Product.insertMany(data.products);
  res.send({ createdUsers, createdProducts });
});

export default seedRoutes;
