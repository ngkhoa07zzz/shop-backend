import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import dotenv from 'dotenv/config.js';
import { isAdmin, isAuth } from '../utils/auth.js';
import Async from '../middleware/Async.js';

const upload = multer();
const uploadRouter = express.Router();

uploadRouter.post(
  '/',
  isAuth,
  isAdmin,
  upload.single('file'),
  Async(async (req, res) => {
    cloudinary.config({
      cloud_name: 'dbeho9za5',
      api_key: '486923621477285',
      api_secret: 'Cz9Gym7m0_6fA4Z5yRrvvytnbhk',
    });
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };
    const result = await streamUpload(req);
    console.log(result);
    res.send(result);
  })
);

export default uploadRouter;
