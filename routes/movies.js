const router = require('express').Router();
const { movieValidator, idValidator } = require('../middlewares/validation');
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', movieValidator, createMovie);
router.delete('/:movieId', idValidator, deleteMovie);

module.exports = router;
