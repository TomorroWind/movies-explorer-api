const { notFoundError } = require('../helpers/errors');
const handleDbError = require('../helpers/handleDbError');
const Movie = require('../models/movie');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.json(movies))
    .catch((err) => handleDbError(err, next));
};

const createMovie = (req, res, next) => {
  Movie.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((newMovie) => res.json(newMovie))
    .catch((err) => handleDbError(err, next));
};

const deleteMovie = (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .orFail(() => notFoundError('Фильм не найден'))
    .then((removedMovie) => res.json(removedMovie))
    .catch((err) => handleDbError(err, next));
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
