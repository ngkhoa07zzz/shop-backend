import express from 'express';

import { isAdmin, isAuth } from '../utils/auth.js';
import {
  deleteUser,
  getUserById,
  listUser,
  userProfile,
  userSignin,
  userSignup,
} from '../controllers/userController.js';

const userRouter = express.Router();

//Get all users
/**
 * @openapi
 * '/api/users/':
 *   get:
 *     tags:
 *     - User
 *     summary: Get all users
 *     security:
 *      - Authorization: []
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
userRouter.get('/', isAuth, isAdmin, listUser);

/**
 * @openapi
 * '/api/users/signin':
 *   post:
 *     tags:
 *     - User
 *     summary: Log in
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin01@gmail.com
 *               password:
 *                 type: string
 *                 example: 12345633333
 *     responses:
 *       200:
 *         description: Log in successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
userRouter.post('/signin', userSignin);

/**
 * @openapi
 * '/api/users/signup':
 *   post:
 *     tags:
 *     - User
 *     summary: Sign up
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: User
 *               email:
 *                 type: string
 *                 example: user01@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456123456
 *     responses:
 *       200:
 *         description: Sign up successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
userRouter.post('/signup', userSignup);

/**
 * @openapi
 * '/api/users/profile':
 *   patch:
 *     tags:
 *     - User
 *     summary: Edit profile
 *     security:
 *     - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: User
 *               email:
 *                 type: string
 *                 example: user01@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456123456
 *     responses:
 *       200:
 *         description: Updated user
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
userRouter.patch('/profile', isAuth, userProfile);

/**
 * @openapi
 * '/api/users/{id}':
 *   get:
 *     tags:
 *     - User
 *     summary: Get user by id
 *     security:
 *     - Authorization: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of user
 *         required: true
 *     responses:
 *       200:
 *         description: Get user
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
userRouter.get('/:id', isAuth, isAdmin, getUserById);

/**
 * @openapi
 * '/api/users/{id}':
 *   delete:
 *     tags:
 *     - User
 *     summary: Delete user
 *     security:
 *     - Authorization: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of user
 *         required: true
 *     responses:
 *       200:
 *         description: Deleted user
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
userRouter.delete('/:id', isAuth, isAdmin, deleteUser);
export default userRouter;
