const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const moviesRouter = require('./movies');
const { login, createUser, signOut } = require('../controllers/users');
const { signupValidator, signinValidator } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundErr');
const { NOT_FOUND_PAGE_ERR_MSG } = require('../utils/constants');

router.post('/signin', signinValidator, login);
router.post('/signup', signupValidator, createUser);
router.post('/signout', signOut);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', moviesRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_PAGE_ERR_MSG));
});

module.exports = router;
