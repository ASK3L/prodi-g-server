module.exports = (err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    message: err.message || 'Something went wrong',
    error: err,
  });
};
