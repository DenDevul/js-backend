function requireToken(req, res, next) {
  const userToken = req.headers['TOKEN'];
  const token = Token.findOne({ where: { value: userToken } });
  if (token) {
    req.body.userId = token.userId;
    next();
  } else {
    res.status(401).send('Invalid token');
  }
}

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const syncHandler = (fn) => (req, res, next) => {
  try {
    fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

const notFound = (req, _res, next) => {
  next(new ErrorResponse(`Not found - ${req.originalUrl}`, 404));
};

const errorHandler = (err, _req, res, _next) => {
  console.log('Ошибка', {
    message: err.message,
    stack: err.stack
  });
  res.status(err.code || 500).json({
    message: err.message
  });
};

module.exports = {
  asyncHandler,
  syncHandler,
  notFound,
  errorHandler
};
