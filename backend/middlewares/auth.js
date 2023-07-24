const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { JWT_KEY, MESSAGE_ERROR_AUTH } = require('../utils/Constants');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError(MESSAGE_ERROR_AUTH));
  }

  const token = authorization.replace('Bearer ', '');

  if (!token) {
    return next(new AuthError(MESSAGE_ERROR_AUTH))
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch (err) {
    return next(new AuthError(MESSAGE_ERROR_AUTH));
  }
  req.user = payload;
  return next();
};
