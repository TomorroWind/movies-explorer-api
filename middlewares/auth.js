const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { unauthorizedError } = require('../helpers/errors');
const { messages } = require('../const');


const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(unauthorizedError(messages.authRequired));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(unauthorizedError(messages.authRequired));
  }

  req.user = payload;

  next();

  return '';
};

module.exports = auth;
