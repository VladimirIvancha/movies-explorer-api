const validator = require('validator');
const {
  WrongURLFormatMessage,
} = require('../constants/errorstatuses');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error(WrongURLFormatMessage);
  }
  return value;
};

module.exports = {
  validateURL,
};
