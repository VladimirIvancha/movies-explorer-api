const { BAD_REQUEST_STATUS } = require('../utils/constants');

class BadRequestErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_STATUS;
  }
}

module.exports = BadRequestErr;
