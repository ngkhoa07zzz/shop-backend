import express from 'express';

import { isAdmin, isAuth } from '../utils/auth.js';

import {
  createOrder,
  deleteOrder,
  deliverOrder,
  getMyOrders,
  getOrder,
  listOrder,
  payOrder,
  summaryData,
} from '../controllers/orderControllers.js';

const orderRouter = express.Router();

/**
 * @openapi
 * '/api/orders/':
 *   post:
 *     tags:
 *     - Order
 *     summary: Create order
 *     security:
 *      - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - orderItems
 *              - shippingAddress
 *              - paymentMethod
 *              - itemsPrice
 *              - shippingPrice
 *              - taxPrice
 *              - totalPrice
 *             properties:
 *               orderItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   items:
 *                     type: string
 *               shippingAddress:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *               itemsPrice:
 *                 type: number
 *               shippingPrice:
 *                 type: number
 *               taxPrice:
 *                 type: number
 *               totalPrice:
 *                 type: number
 *     responses:
 *       201:
 *         description: Create order successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
orderRouter.post('/', isAuth, createOrder);

/**
 * @openapi
 * '/api/orders/':
 *   get:
 *     tags:
 *     - Order
 *     summary: Get all orders
 *     security:
 *      - Authorization: []
 *     responses:
 *       200:
 *         description: Get all orders successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
orderRouter.get('/', isAuth, isAdmin, listOrder);

/**
 * @openapi
 * '/api/orders/summary':
 *   get:
 *     tags:
 *     - Order
 *     summary: Dashboard
 *     security:
 *      - Authorization: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
orderRouter.get('/summary', isAuth, isAdmin, summaryData);

/**
 * @openapi
 * '/api/orders/mine':
 *   get:
 *     tags:
 *     - Order
 *     summary: Get my order
 *     security:
 *      - Authorization: []
 *     parameters:
 *       - name: id
 *         description: The id of user
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
orderRouter.get('/mine', isAuth, getMyOrders);

/**
 * @openapi
 * '/api/orders/{id}':
 *   get:
 *     tags:
 *     - Order
 *     summary: Get a order
 *     security:
 *      - Authorization: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of order
 *         required: true
 *     responses:
 *       200:
 *         description: Deleted order
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
orderRouter.get('/:id', isAuth, getOrder);

/**
 * @openapi
 * '/api/orders/{id}':
 *   delete:
 *     tags:
 *     - Order
 *     summary: Delete a order
 *     security:
 *      - Authorization: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of order
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
orderRouter.delete('/:id', isAuth, isAdmin, deleteOrder);

/**
 * @openapi
 * '/api/orders/{id}/deliver':
 *   put:
 *     tags:
 *     - Order
 *     summary: Get a order
 *     security:
 *      - Authorization: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of order
 *         required: true
 *     responses:
 *       200:
 *         description: Update deliver order success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
orderRouter.put('/:id/deliver', isAuth, isAdmin, deliverOrder);

/**
 * @openapi
 * '/api/orders/{id}/pay':
 *   put:
 *     tags:
 *     - Order
 *     summary: Get a order
 *     security:
 *      - Authorization: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of order
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - status
 *              - update_time
 *              - email_address
 *             properties:
 *               status:
 *                 type: string
 *               update_time:
 *                 type: string
 *               email_address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update deliver order success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
orderRouter.put('/:id/pay', isAuth, payOrder);

export default orderRouter;
