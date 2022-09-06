const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUserMe,
  updateUser,
  // getUsers,
  // getUser,
  // updateAvatar,
} = require('../controllers/users');

// const {
//   validateURL,
// } = require('../middlewares/validation');

// router.get('/', getUsers);
router.get(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email().required(),
    }),
  }),
  getUserMe,
);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email().required(),
    }),
  }),
  updateUser,
);
// router.get(
//   '/:userId',
//   celebrate({ params: Joi.object().keys({ userId: Joi.string().length(24) }) }),
//   getUser,
// );
// router.patch(
//   '/me/avatar',
//   celebrate(
//     {
//       body: Joi.object({ avatar: Joi.string().custom(validateURL) }),
//     },
//   ),
//   updateAvatar,
// );

module.exports = router;
