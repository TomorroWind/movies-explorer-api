const Movie = require('../models/movie');
const handleDbError = require('../helpers/handleDbError');
const { forbiddenError, notFoundError } = require('../helpers/errors');
const { messages } = require('../const');

const checkMovieOwner = (req, res, next) => {
  Movie.findById(req.params.id).select('+owner')
    .orFail(() => notFoundError(messages.movieNotFound))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(forbiddenError(messages.notOwner));
      }

      return next();
    })
    .catch((err) => handleDbError(err, next));
};

module.exports = checkMovieOwner;
