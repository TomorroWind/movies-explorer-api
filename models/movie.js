const mongoose = require('mongoose');
const validator = require('validator');
const { messages } = require('../const');

const movieSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: [true, messages.fieldIsRequired],
  },
  country: {
    type: String,
    required: [true, messages.fieldIsRequired],
  },
  director: {
    type: String,
    required: [true, messages.fieldIsRequired],
  },
  duration: {
    type: Number,
    required: [true, messages.fieldIsRequired],
  },
  year: {
    type: String,
    minlength: 2,
    maxlength: 4,
    required: [true, messages.fieldIsRequired],
  },
  description: {
    type: String,
    required: [true, messages.fieldIsRequired],
  },
  image: {
    type: String,
    required: [true, messages.fieldIsRequired],
    validate: {
      validator: (value) => validator.isURL(value),
      message: messages.notValidUrl,
    },
  },
  trailer: {
    type: String,
    required: [true, messages.fieldIsRequired],
    validate: {
      validator: (value) => validator.isURL(value),
      message: messages.notValidUrl,
    },
  },
  thumbnail: {
    type: String,
    required: [true, messages.fieldIsRequired],
    validate: {
      validator: (value) => validator.isURL(value),
      message: messages.notValidUrl,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false,
  },
  nameRU: {
    type: String,
    required: [true, messages.fieldIsRequired],
  },
  nameEN: {
    type: String,
    required: [true, messages.fieldIsRequired],
  },
});

movieSchema.index({ movieId: 1, owner: 1 }, { unique: true });

module.exports = mongoose.model('movie', movieSchema);
