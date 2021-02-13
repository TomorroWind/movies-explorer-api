const { badRequestError, conflictError, internalServerlError } = require('./errors');

const handleDbError = (err, next) => {
  if (err.name === 'ValidationError') {
    next(badRequestError(`${Object.keys(err.errors).map((error) => error.message).join(', ')}`));
  } else if (err.name === 'MongoError' && err.code === 11000) {
    next(conflictError('Сущность с таким идентификатором уже существует'));
  } else if (err.statusCode) {
    next(err);
  } else {
    next(internalServerlError('На сервере произошла ошибка'));
  }
};

module.exports = handleDbError;
