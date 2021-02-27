const usersRouter = require('express').Router();
const { getMe, updateMe } = require('../controllers/usersController');
const { validateUpdateMe } = require('../middlewares/validations');

usersRouter.get('/me', getMe);
usersRouter.patch('/me', validateUpdateMe, updateMe);

module.exports = usersRouter;
