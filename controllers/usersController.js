const { notFoundError } = require('../helpers/errors');
const handleDbError = require('../helpers/handleDbError');
const User = require('../models/user');
const { messages } = require('../const');

const getMe = (req, res, next) => {
  User.findById(req.user._id).orFail(notFoundError(messages.userNotFound))
    .then((user) => res.json(user))
    .catch((err) => handleDbError(err, next));
};

const updateMe = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id,
    req.body,
    {
      new: true,
      runValidators: true,
    })
    .orFail(notFoundError(messages.userNotFound))
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => handleDbError(err, next));
};

module.exports = {
  updateMe,
  getMe,
};
