const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: [true, 'Поле movieId обязательно для заполнения'],
  },
  country: {
    type: String,
    required: [true, 'Поле country обязательно для заполнения'],
  },
  director: {
    type: String,
    required: [true, 'Поле director обязательное для заполнения'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле duration обязательное для заполнения'],
  },
  year: {
    type: String,
    minlength: 2,
    maxlength: 4,
    required: [true, 'Поле year обязательное для заполнения'],
  },
  description: {
    type: String,
    required: [true, 'Поле description обязательное для заполнения'],
  },
  image: {
    type: String,
    required: [true, 'Поле image обязательное для заполнения'],
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Поле должно быть ссылкой',
    },
  },
  trailer: {
    type: String,
    required: [true, 'Поле trailer обязательное для заполнения'],
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Поле должно быть ссылкой',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле thumbnail обязательное для заполнения'],
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Поле должно быть ссылкой',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false,
  },
  nameRU: {
    type: String,
    required: [true, 'Поле nameRU обязательное для заполнения'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле nameEN обязательное для заполнения'],
  },
});

movieSchema.index({ movieId: 1, owner: 1 }, { unique: true });

module.exports = mongoose.model('movie', movieSchema);
