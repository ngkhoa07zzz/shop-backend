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

/**
 * @openapi
 * '/api/products/':
 *   get:
 *     tags:
 *     - Product
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: Get your profile's information successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
productRouter.get('/', getAllProducts);

/**
 * @openapi
 * '/api/products/':
 *   post:
 *     tags:
 *     - Product
 *     summary: Create product
 *     security:
 *      - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - name
 *              - slug
 *              - image
 *              - price
 *              - category
 *              - brand
 *              - countInStock
 *              - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: CPU Intel Core i7
 *               slug:
 *                 type: string
 *                 example: cpu-intel-core-i7
 *               image:
 *                 type: string
 *                 example: /images/cpu-intel-core-i7.jpg
 *               price:
 *                 type: number
 *                 example: 0
 *               category:
 *                 type: string
 *                 example: CPU - Bộ vi xử lý
 *               brand:
 *                 type: string
 *                 example: Intel
 *               countInStock:
 *                 type: number
 *                 example: 0
 *               rating:
 *                 type: number
 *                 example: 0
 *               numReviews:
 *                 type: number
 *                 example: 0
 *               description:
 *                 type: string
 *                 example: sample description
 *     responses:
 *       201:
 *         description: Create product successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
productRouter.post('/', isAuth, isAdmin, createProduct);

/**
 * @openapi
 * '/api/products/admin':
 *   get:
 *     tags:
 *     - Product
 *     summary: List products by admin
 *     security:
 *      - Authorization: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The page of products
 *         required: true
 *       - name: pageSize
 *         in: query
 *         description: The limit products per page
 *         required: true
 *     responses:
 *       200:
 *         description: Get all users successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
productRouter.get('/admin', isAuth, isAdmin, listProduct);

/**
 * @openapi
 * '/api/products/search':
 *   get:
 *     tags:
 *     - Product
 *     summary: Filter product
 *     parameters:
 *       - name: category
 *         in: query
 *         description: The category of products
 *         example: CPU - Bộ vi xử lý
 *       - name: query
 *         in: query
 *         description: The query of products
 *         example: Card
 *       - name: price
 *         in: query
 *         description: The price of products
 *         example: 1-50
 *       - name: rating
 *         in: query
 *         description: The rating of products
 *         example: 4
 *       - name: order
 *         in: query
 *         description: The order of products
 *         example: lowest
 *       - name: page
 *         in: query
 *         description: The page of products
 *         example: 1
 *       - name: pageSize
 *         in: query
 *         description: The limit products per page
 *         example: 3
 *     responses:
 *       200:
 *         description: Query products successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
productRouter.get('/search', filterProduct);

/**
 * @openapi
 * '/api/products/categories':
 *   get:
 *     tags:
 *     - Product
 *     summary: Get categories
 *     responses:
 *       200:
 *         description: Get all categories successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
productRouter.get('/categories', getCategories);

/**
 * @openapi
 * '/api/products/slug/{slug}':
 *   get:
 *     tags:
 *     - Product
 *     summary: Get product by slug
 *     parameters:
 *       - name: slug
 *         in: path
 *         example: cpu-intel-core-i7
 *     responses:
 *       200:
 *         description: Get all categories successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
productRouter.get('/slug/:slug', getProductBySlug);

/**
 * @openapi
 * '/api/products/{id}':
 *   patch:
 *     tags:
 *     - Product
 *     summary: Edit product
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of product
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - name
 *              - slug
 *              - image
 *              - price
 *              - category
 *              - brand
 *              - countInStock
 *              - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: CPU Intel Core i7
 *               slug:
 *                 type: string
 *                 example: cpu-intel-core-i7
 *               image:
 *                 type: string
 *                 example: /images/cpu-intel-core-i7.jpg
 *               price:
 *                 type: number
 *                 example: 0
 *               category:
 *                 type: string
 *                 example: CPU - Bộ vi xử lý
 *               brand:
 *                 type: string
 *                 example: Intel
 *               countInStock:
 *                 type: number
 *                 example: 0
 *               rating:
 *                 type: number
 *                 example: 0
 *               numReviews:
 *                 type: number
 *                 example: 0
 *               description:
 *                 type: string
 *                 example: sample description
 *     responses:
 *       200:
 *         description: Update product successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
productRouter.patch('/:id', isAuth, isAdmin, editProduct);

/**
 * @openapi
 * '/api/products/{id}':
 *   get:
 *     tags:
 *     - Product
 *     summary: Get product by id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of product
 *         required: true
 *     responses:
 *       200:
 *         description: Get product successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
productRouter.get('/:id', getProductById);

/**
 * @openapi
 * '/api/product/{id}':
 *   delete:
 *     tags:
 *     - Product
 *     summary: Delete product
 *     security:
 *     - Authorization: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of product
 *         required: true
 *     responses:
 *       200:
 *         description: Deleted product
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
productRouter.delete('/:id', isAuth, isAdmin, deleteProduct);

export default productRouter;
