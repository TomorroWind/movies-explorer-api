const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { unauthorizedError } = require('../helpers/errors');
const { messages } = require('../const');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, messages.fieldIsRequired],
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: messages.notValidEmail,
    },
  },
  password: {
    type: String,
    minlength: [8, `${messages.minLength} 8`],
    required: [true, messages.fieldIsRequired],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, `${messages.minLength} 2`],
    maxlength: [30, `${messages.maxLength} 30`,],
    required: [true, messages.fieldIsRequired],
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password').orFail(() => unauthorizedError(messages.wrongCreds))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(unauthorizedError(messages.wrongCreds));
        }

        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);
