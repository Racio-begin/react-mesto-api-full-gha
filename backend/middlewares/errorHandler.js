const { INTERNAL_SERVER_ERROR } = require('../utils/ServerResponseStatuses');

const errorHandler = (err, _, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR } = err;
  res.status(statusCode).send({ message: statusCode === INTERNAL_SERVER_ERROR ? 'Ошибка сервера' : err.message });
  next();
};

module.exports = errorHandler;
