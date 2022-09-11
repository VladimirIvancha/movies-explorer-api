const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const { UNAUTHORIZED_ERR_MSG, USER_MINLENGTH_VALIDATION_MSG, USER_MAXLENGTH_VALIDATION_MSG } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, USER_MINLENGTH_VALIDATION_MSG],
    maxlength: [30, USER_MAXLENGTH_VALIDATION_MSG],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (mail) => validator.isEmail(mail),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(UNAUTHORIZED_ERR_MSG));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(UNAUTHORIZED_ERR_MSG));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
