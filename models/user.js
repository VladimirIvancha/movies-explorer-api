const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const {
  UnAuthorizedErrMessage,
} = require('../constants/errorstatuses');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Имя пользователя должно быть не менее 2х знаков, сейчас {VALUE}'],
    maxlength: [30, 'Имя пользователя должно быть не более 30ти знаков, сейчас {VALUE}'],
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
        return Promise.reject(new Error(UnAuthorizedErrMessage));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(UnAuthorizedErrMessage));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
