const { FORBIDDEN_ERROR } = require('../utils/ServerResponseStatuses');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_ERROR;
  }
}

module.exports = ForbiddenError;
