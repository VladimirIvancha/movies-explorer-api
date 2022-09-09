const { CONFLICT_STATUS } = require('../utils/constants');

class ConflictErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_STATUS;
  }
}

module.exports = ConflictErr;
