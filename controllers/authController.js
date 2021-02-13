const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const handleDbError = require('../helpers/handleDbError');
const { JWT_SECRET } = require('../config');

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1h' });

      return res.send({ token });
    })
    .catch((err) => next(err));
};

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      req.body.password = hash;
      return User.create(req.body);
    })
    .then((newUser) => User.findById(newUser._id))
    .then((user) => res.send(user))
    .catch((err) => handleDbError(err, next));
};

module.exports = {
  login,
  register,
};
