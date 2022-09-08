require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundErr');
const UnAuthorizedErr = require('../errors/UnAuthorizedErr');
const BadRequestErr = require('../errors/BadRequestErr');
const ConflictErr = require('../errors/ConflictErr');

const { NODE_ENV, JWT_SECRET } = process.env;

const {
  ok,
  created,
  BadReqErrMessage,
  NotFoundUserErrMessage,
  ConflictErrMessage,
  UnAuthorizedErrMessage,
} = require('../constants/errorstatuses');

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
    .then((user) => res.status(created).send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr(BadReqErrMessage));
      } else if (err.code === 11000) {
        next(new ConflictErr(ConflictErrMessage));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(new NotFoundError(NotFoundUserErrMessage))
    .then((user) => {
      res.status(ok).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr(BadReqErrMessage));
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
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => {
      next(new UnAuthorizedErr(UnAuthorizedErrMessage));
    });
};
