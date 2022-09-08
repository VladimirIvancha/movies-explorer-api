const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const moviesRouter = require('./movies');
const { login, createUser } = require('../controllers/users');

const NotFoundError = require('../errors/NotFoundErr');

const {
  NotFoundPageErrMessage,
} = require('../constants/errorstatuses');

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30).required(),
    }),
  }),
  createUser,
);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', moviesRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError(NotFoundPageErrMessage));
});

module.exports = router;
