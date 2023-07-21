const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../utils/sk');
const UnauthorizedError = require('../errors/UnauthorizedError');

const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    // throw new UnauthorizedError('Необходима авторизация!');
    return next(new UnauthorizedError('Необходима авторизация!'));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(
      token,
      SECRET_KEY,
    );
  } catch (err) {
    // next(new UnauthorizedError('Необходима авторизация!'));
    return next(new UnauthorizedError('Необходима авторизация!'));
  }

  req.user = payload;

  next();
};
