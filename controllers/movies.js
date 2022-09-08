const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundErr');
const BadRequestErr = require('../errors/BadRequestErr');
const ForbiddenErr = require('../errors/ForbiddenErr');

const {
  ok,
  created,
  BadReqErrMessage,
  NotFoundMovieErrMessage,
  ForbiddenErrMessage,
} = require('../constants/errorstatuses');

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
    trailer,
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
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(created).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr(BadReqErrMessage));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError(NotFoundMovieErrMessage))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        next(new ForbiddenErr(ForbiddenErrMessage));
        return;
      }
      Movie.findByIdAndRemove(req.params.movieId)
        .then(() => {
          res.status(ok).send({ message: 'Фильм удален' });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr(BadReqErrMessage));
        return;
      }
      next(err);
    });
};
