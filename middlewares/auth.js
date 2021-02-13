const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { unauthorizedError } = require('../helpers/errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(unauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(unauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  next();

  return '';
};

module.exports = auth;
