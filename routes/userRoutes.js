import express from 'express';
import bcript from 'bcrypt';
import Async from '../middleware/Async.js';
import User from '../models/userModel.js';
import ApiError from '../utils/ApiError.js';
import { generateToken } from '../utils/Jwt.js';

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

export default userRouter;
