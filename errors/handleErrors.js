const { DEFAULT_ERROR_STATUS } = require('../utils/constants');

const handleErrors = (err, req, res, next) => {
  const { statusCode = DEFAULT_ERROR_STATUS, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === DEFAULT_ERROR_STATUS
        ? 'Произошла ошибка'
        : message,
    });
  next();
};

module.exports = handleErrors;
