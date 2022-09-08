const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  validateURL,
} = require('../middlewares/validation');

const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().custom(validateURL),
      trailer: Joi.string().custom(validateURL),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().custom(validateURL),
      movieId: Joi.number().required(),
    }),
  }),
  createMovie,
);

router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
