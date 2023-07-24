const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_FOUND = 404;
const STATUS_FATAL = 500;
const STATUS_AUTH = 401;
const STATUS_CONFLICT = 409;
const STATUS_FORBIDDEN = 403;

const MESSAGE_ERROR_AUTH = 'Требуется авторизация';
const MESSAGE_ERROR_FATAL = 'Ошибка сервера';
const MESSAGE_ERROR_NOT_FOUND = 'Страница не найдена'

const JWT_KEY = process.env.JWT_KEY || 'secretKey';

const REGEXP = /^https?:\/\/(?:www\.)?[a-zA-Z0-9а-яА-Я-._~:/?#[\]@!$&'()*+,;=]+/im

module.exports = {
  JWT_KEY,
  REGEXP,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_FATAL,
  STATUS_AUTH,
  STATUS_CONFLICT,
  STATUS_FORBIDDEN,
  MESSAGE_ERROR_AUTH,
  MESSAGE_ERROR_FATAL,
  MESSAGE_ERROR_NOT_FOUND
};
