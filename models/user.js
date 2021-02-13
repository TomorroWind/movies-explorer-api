const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { unauthorizedError } = require('../helpers/errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле email должно быть заполнено'],
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Значение должно быть почтой',
    },
  },
  password: {
    type: String,
    minlength: [8, 'Минимальная длина поля  password - 8'],
    required: [true, 'Поле password должно быть заполнено'],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля  password - 2'],
    maxlength: [30, 'Максимальная длина поля  password - 30'],
    required: [true, 'Поле name должно быть заполнено'],
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password').orFail(() => unauthorizedError('Неправильные почта или пароль'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(unauthorizedError('Неправильные почта или пароль'));
        }

        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);
