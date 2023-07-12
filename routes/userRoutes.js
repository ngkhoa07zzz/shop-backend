import express from 'express';
import bcript from 'bcrypt';
import Async from '../middleware/Async.js';
import User from '../models/userModel.js';
import ApiError from '../utils/ApiError.js';
import { generateToken, isAuth } from '../utils/auth.js';

const userRouter = express.Router();

userRouter.post(
  '/signin',
  Async(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, 'Invalid email or password');
    }
    const user = await User.findOne({ email });
    if (user && (await bcript.compareSync(password, user.password))) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    } else {
      throw new ApiError(401, 'Unauthorize user');
    }
  })
);
userRouter.post(
  '/signup',
  Async(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new ApiError(400, 'All field are mandatory');
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      throw new ApiError(400, 'User has already registered');
    }
    const hashPassword = await bcript.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);
userRouter.patch(
  '/profile',
  isAuth,
  Async(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new ApiError(404, 'User not found');
    } else {
      const hashPassword = await bcript.hash(password, 10);

      const userUpdate = await User.findByIdAndUpdate(req.user._id, {
        name: name || user.name,
        email: email || user.email,
        password: hashPassword,
      });
      res.send({
        _id: userUpdate._id,
        name: userUpdate.name,
        email: userUpdate.email,
        isAdmin: userUpdate.isAdmin,
        token: generateToken(userUpdate),
      });
    }
  })
);
export default userRouter;
