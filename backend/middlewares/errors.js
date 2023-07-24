const { MESSAGE_ERROR_FATAL } = require('../utils/Constants');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? MESSAGE_ERROR_FATAL : message,
  });

  next();
};
