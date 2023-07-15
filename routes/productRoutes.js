import express from 'express';
import Product from '../models/productModel.js';
import Async from '../middleware/Async.js';
import { isAdmin, isAuth } from '../utils/auth.js';

const productRouter = express.Router();

productRouter.get(
  '/',
  Async(async (req, res) => {
    const products = await Product.find();
    res.send(products);
  })
);

productRouter.post(
  '/',
  isAuth,
  isAdmin,
  Async(async (req, res) => {
    const newProduct = await Product.create({
      name: 'sample name ' + Date.now(),
      slug: 'sample-name-' + Date.now(),
      image: 'images/asus-dual-rtx4060.jpg',
      price: 0,
      category: 'sample category',
      brand: 'sample brand',
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: 'sample description',
    });

    res.send({ message: 'Product Created', newProduct });
  })
);

productRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  Async(async (req, res) => {
    const PAGE_SIZE = 10;
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const products = await Product.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await Product.countDocuments();
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.get(
  '/search',
  Async(async (req, res) => {
    const PAGE_SIZE = 3;
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';
    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};
    const categoryFilter = category && category !== 'all' ? { category } : {};
    const ratingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== 'all'
        ? {
            // 1-50
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};
    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };
    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.get(
  '/categories',
  Async(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

productRouter.get(
  '/slug/:slug',
  Async(async (req, res) => {
    const { slug } = req.params.slug;
    const product = await Product.findOne({ slug: { $eq: req.params.slug } });
    if (product) {
      res.send(product);
    } else {
      throw new ApiError(404, 'Product not found');
    }
  })
);

productRouter.patch(
  '/:id',
  isAuth,
  isAdmin,
  Async(async (req, res) => {
    const {
      name,
      slug,
      price,
      image,
      category,
      brand,
      countInStock,
      description,
    } = req.body;
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      throw new ApiError(404, 'Product not found');
    }
    await Product.findByIdAndUpdate(id, {
      name,
      slug,
      price,
      image,
      category,
      brand,
      countInStock,
      description,
    });
    res.send({ message: 'Product Updated' });
  })
);
productRouter.get(
  '/:id',
  Async(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
      res.send(product);
    } else {
      throw new ApiError(404, 'Product not found');
    }
  })
);

export default productRouter;
