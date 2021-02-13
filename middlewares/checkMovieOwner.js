const Movie = require('../models/movie');
const handleDbError = require('../helpers/handleDbError');
const { forbiddenError, notFoundError } = require('../helpers/errors');

const checkMovieOwner = (req, res, next) => {
  Movie.findById(req.params.id).select('+owner')
    .orFail(() => notFoundError('Фильм не найден'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(forbiddenError('Пользователь не является владельцем фильма'));
      }

      return next();
    })
    .catch((err) => handleDbError(err, next));
};

module.exports = checkMovieOwner;
