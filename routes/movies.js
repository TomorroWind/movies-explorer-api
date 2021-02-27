const moviesRouter = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/moviesController');
const checkMovieOwner = require('../middlewares/checkMovieOwner');
const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/validations');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', validateCreateMovie, createMovie);
moviesRouter.delete('/:id', validateDeleteMovie, checkMovieOwner, deleteMovie);

module.exports = moviesRouter;
