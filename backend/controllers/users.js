const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const RegisterError = require("../errors/RegisterError");
const NotFoundError = require("../errors/NotFoundError");
const InvalidError = require("../errors/InvalidError");
const { JWT_KEY } = require("../utils/Constants");

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) =>
      res.status(201).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      })
    )
    .catch((err) => {
      if (err.code === 11000) {
        return next(new RegisterError("Пользователь уже существует"));
      }
      if (err.name === "ValidationError") {
        return next(new InvalidError("Неккоректные данные"));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_KEY, {
        expiresIn: "7d",
      });

      res.cookie("jwt", token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });

      return res.send({ token });
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new InvalidError("Неккоректные данные"));
      }
      return next(err);
    });
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError("Пользователь не найден"));
      }

      return res.send(user);
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new InvalidError("Неккоректные данные"));
      }

      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const data = { avatar: req.body.avatar };

  return User.findByIdAndUpdate(req.user._id, data, {
    runValidators: true,
    new: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new InvalidError("Неккорректные данные ссылки"));
      }

      return next(err);
    });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateProfile,
  updateAvatar,
  login,
  getUser,
};
