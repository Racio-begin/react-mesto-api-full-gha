const { INTERNAL_SERVER_ERROR } = require('../utils/ServerResponseStatuses');

class IntervalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INTERNAL_SERVER_ERROR;
  }
}

module.exports = IntervalServerError;
