import express from 'express';

import { isAuth } from '../utils/auth.js';
import {
  userProfile,
  userSignin,
  userSignup,
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/signin', userSignin);
userRouter.post('/signup', userSignup);
userRouter.patch('/profile', isAuth, userProfile);
export default userRouter;
