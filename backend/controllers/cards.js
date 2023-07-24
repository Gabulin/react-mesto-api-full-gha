const Card = require('../models/card');
const InvalidError = require('../errors/InvalidError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { MESSAGE_ERROR_NOT_FOUND } = require('../utils/Constants');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => card.populate('owner').then((data) => res.status(201).send(data)))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new InvalidError('Некорректные данные'));
      }
      return next(err);
    });
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(MESSAGE_ERROR_NOT_FOUND);
      }

      if (card.owner.equals(req.user._id)) {
        return card.deleteOne().then(() => res.send(card));
      }

      return next(new ForbiddenError('Некорректные данные для удаления'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidError('Неверный формат идентификатора'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(MESSAGE_ERROR_NOT_FOUND);
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidError('Неверный формат идентификатора'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(MESSAGE_ERROR_NOT_FOUND);
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidError('Неверный формат идентификатора'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
