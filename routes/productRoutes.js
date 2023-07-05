import express from 'express';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});
productRouter.get('/slug/:slug', async (req, res) => {
  const { slug } = req.params.slug;
  const product = await Product.findOne({ slug: { $eq: req.params.slug } });
  if (product) {
    res.send(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});
productRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});
export default productRouter;
