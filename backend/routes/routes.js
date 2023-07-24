const routes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const NotFoundError = require('../errors/NotFoundError');
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { MESSAGE_ERROR_NOT_FOUND, REGEXP } = require('../utils/Constants');

routes.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

routes.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(REGEXP),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

routes.use(auth);

routes.use('/users', userRouter);
routes.use('/cards', cardRouter);

routes.use((req, res, next) => {
  next(new NotFoundError(MESSAGE_ERROR_NOT_FOUND));
});

module.exports = routes;
