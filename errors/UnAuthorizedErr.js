const { NOT_AUTH_STATUS } = require('../utils/constants');

class UnAuthorizedErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_AUTH_STATUS;
  }
}

module.exports = UnAuthorizedErr;
