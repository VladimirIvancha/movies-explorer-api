require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { secretTokenKey, jwtSettings } = require('../utils/config');

const NotFoundError = require('../errors/NotFoundErr');
const UnAuthorizedErr = require('../errors/UnAuthorizedErr');
const BadRequestErr = require('../errors/BadRequestErr');
const ConflictErr = require('../errors/ConflictErr');

const { NODE_ENV, JWT_SECRET } = process.env;

const {
  OK_STATUS,
  CREATED_STATUS,
  BAD_REQ_ERR_MSG,
  NOT_FOUND_USER_ERR_MSG,
  CONFLICT_ERR_MSG,
  UNAUTHORIZED_ERR_MSG,
} = require('../utils/constants');

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => res.status(CREATED_STATUS).send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr(BAD_REQ_ERR_MSG));
      } else if (err.code === 11000) {
        next(new ConflictErr(CONFLICT_ERR_MSG));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(new NotFoundError(NOT_FOUND_USER_ERR_MSG))
    .then((user) => {
      res.status(OK_STATUS).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr(BAD_REQ_ERR_MSG));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : secretTokenKey,
        jwtSettings,
      );
      res.send({ token });
    })
    .catch(() => {
      next(new UnAuthorizedErr(UNAUTHORIZED_ERR_MSG));
    });
};
