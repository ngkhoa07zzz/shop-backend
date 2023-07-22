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

userRouter.get('/', isAuth, isAdmin, listUser);
userRouter.post('/signin', userSignin);
userRouter.post('/signup', userSignup);
userRouter.patch('/profile', isAuth, userProfile);
userRouter.get('/:id', isAuth, isAdmin, getUserById);
userRouter.delete('/:id', isAuth, isAdmin, deleteUser);
export default userRouter;
