import Async from '../middleware/Async.js';
import Product from '../models/productModel.js';
import ApiError from '../utils/ApiError.js';

// @desc Get all product
// @route GET /api/products/
// @access public
const getAllProducts = Async(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// @desc Create product
// @route POST /api/products/
// @access private
const createProduct = Async(async (req, res) => {
  const product = await Product.create({
    name: 'sample name' + Date.now(),
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
  res.status(201).json({ message: 'Product created', product });
});

// @desc List product for admin
// @route GET /api/products/admin
// @access private
const listProduct = Async(async (req, res) => {
  const PAGE_SIZE = 10;
  const { query } = req;
  const page = query.page || 1;
  const pageSize = query.pageSize || PAGE_SIZE;

  const products = await Product.find()
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  const countProducts = await Product.countDocuments();
  res.json({
    products,
    countProducts,
    page,
    pages: Math.ceil(countProducts / pageSize),
  });
});

// @desc Search product
// @route GET /api/products/search
// @access public
const filterProduct = Async(async (req, res) => {
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
  res.json({
    products,
    countProducts,
    page,
    pages: Math.ceil(countProducts / pageSize),
  });
});

// @desc View product categories
// @route GET /api/products/categories
// @access public
const getCategories = Async(async (req, res) => {
  const categories = await Product.find().distinct('category');
  res.json(categories);
});

// @desc view product by slug
// @route GET /api/products/slug/:slug
// @access public
const getProductBySlug = Async(async (req, res) => {
  const product = await Product.findOne({ slug: { $eq: req.params.slug } });
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  res.json(product);
});

// @desc Update product
// @route PATCH /api/products/:id
// @access private
const editProduct = Async(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, 'Product not found!');
  }
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
  res.status(201).json({ message: `Product ${id} updated` });
});

// @desc view product by id
// @route GET /api/products/:id
// @access public
const getProductById = Async(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, 'Product not found!');
  }
  res.json(product);
});

// @desc Delete product
// @route DELETE /api/products/:id
// @access private
const deleteProduct = Async(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, 'Product not found!');
  }
  await Product.findByIdAndDelete(id);
  res.json({ message: 'Product deteled' });
});

export {
  getAllProducts,
  createProduct,
  listProduct,
  getCategories,
  getProductBySlug,
  filterProduct,
  editProduct,
  getProductById,
  deleteProduct,
};
