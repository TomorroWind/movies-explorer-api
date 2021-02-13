const router = require('express').Router();
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { login, register } = require('../controllers/authController');
const { notFoundError } = require('../helpers/errors');
const { validateLogin, validateRegister } = require('../middlewares/validations');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, register);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use((req, res, next) => {
  next(notFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
