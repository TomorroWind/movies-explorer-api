const { badRequestError, conflictError, internalServerlError } = require('./errors');
const { messages } = require('../const');

const handleDbError = (err, next) => {
  if (err.name === 'ValidationError') {
    next(badRequestError(`${Object.keys(err.errors).map((error) => error.message).join(', ')}`));
  } else if (err.name === 'MongoError' && err.code === 11000) {
    next(conflictError(messages.notUniqueId));
  } else if (err.statusCode) {
    next(err);
  } else {
    next(internalServerlError(messages.serverError));
  }
};

module.exports = handleDbError;
