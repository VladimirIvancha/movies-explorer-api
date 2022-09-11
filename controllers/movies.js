const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundErr');
const BadRequestErr = require('../errors/BadRequestErr');
const ForbiddenErr = require('../errors/ForbiddenErr');

const {
  OK_STATUS,
  CREATED_STATUS,
  BAD_REQ_ERR_MSG,
  NOT_FOUND_MOVIE_ERR_MSG,
  FORBIDDEN_ERR_MSG,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(CREATED_STATUS).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr(BAD_REQ_ERR_MSG));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError(NOT_FOUND_MOVIE_ERR_MSG))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        next(new ForbiddenErr(FORBIDDEN_ERR_MSG));
        return;
      }
      Movie.findByIdAndRemove(req.params.movieId)
        .then(() => {
          res.status(OK_STATUS).send({ message: 'Фильм удален' });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr(BAD_REQ_ERR_MSG));
        return;
      }
      next(err);
    });
};
