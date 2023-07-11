import dotenv from 'dotenv/config';

const connectDb = mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connect to database successfully!');
  })
  .catch((err) => {
    console.log(err.message);
  });

export default connectDb;
