const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  if (err.name === 'CastError') {
    err.statusCode = 400;
    err.message = err.message || 'error';
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    statusCode: err.statusCode,
  });
};

export default errorHandler;
