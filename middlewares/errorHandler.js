const { messages } = require('../const');

const errorHandler = (err, req, res, next) => {
  const localErr = err;
  if (!err.statusCode) {
    localErr.statusCode = 500;
    localErr.message = messages.serverError;
  }

  res.status(localErr.statusCode).send({ message: localErr.message });
  next();
};

module.exports = errorHandler;
