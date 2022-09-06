const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  validateURL,
} = require('../middlewares/validation');

const {
  createMovie,
  getMovies,
  deleteMovie,
  // likeCard,
  // dislikeCard,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post(
  '/',
  celebrate({
    body: Joi.object({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.string().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().custom(validateURL),
      trailer: Joi.string().custom(validateURL),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().custom(validateURL),
    }),
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex(),
    }),
  }),
  createMovie,
);

router.delete(
  '/:movieId',
  celebrate({ params: Joi.object().keys({ movieId: Joi.string().length(24).hex() }) }),
  deleteMovie,
);

// router.put(
//   '/:cardId/likes',
//   celebrate({ params: Joi.object().keys({ cardId: Joi.string().length(24).hex() }) }),
//   likeCard,
// );

// router.delete(
//   '/:cardId/likes',
//   celebrate({ params: Joi.object().keys({ cardId: Joi.string().length(24).hex() }) }),
//   dislikeCard,
// );

module.exports = router;
