const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/AuthError');

const userSchema = new mongoose.Schema(
  {
    name: {
      minlength: 2,
      maxlength: 30,
      type: String,
      default: 'Жак-Ив Кусто',
    },
    about: {
      minlength: 2,
      maxlength: 30,
      type: String,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Неккоректные данные ссылки',
      },
    },
    email: {
      unique: true,
      type: String,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Неккоректные данные почты',
      },
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
  },
);

userSchema.statics.findByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неккоректные данные почты или пароля');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неккоректные данные почты или пароля');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
