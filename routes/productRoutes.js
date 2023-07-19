import express from 'express';
import Product from '../models/productModel.js';
import Async from '../middleware/Async.js';
import { isAdmin, isAuth } from '../utils/auth.js';
import ApiError from '../utils/ApiError.js';
import {
  createProduct,
  deleteProduct,
  editProduct,
  filterProduct,
  getAllProducts,
  getCategories,
  getProductById,
  getProductBySlug,
  listProduct,
} from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/', getAllProducts);

productRouter.post('/', isAuth, isAdmin, createProduct);

productRouter.get('/admin', isAuth, isAdmin, listProduct);

productRouter.get('/search', filterProduct);

productRouter.get('/categories', getCategories);

productRouter.get('/slug/:slug', getProductBySlug);

productRouter.patch('/:id', isAuth, isAdmin, editProduct);

productRouter.get('/:id', getProductById);

productRouter.delete('/:id', isAuth, isAdmin, deleteProduct);

export default productRouter;
