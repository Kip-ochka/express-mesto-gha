const Cards = require('../models/card');
const { DEFAULT_ERROR_CODE, NOT_FOUND_ERROR_CODE, INCORRECT_DATA_ERROR_CODE } = require('../utils/errors');

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => {
      res.send(cards);
    }).catch(() => res.status(DEFAULT_ERROR_CODE).send({ message: 'На сервере произошла обика' }));
};

module.exports.createCards = (req, res) => {
  const { name, link } = req.body;
  Cards.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Ошибка валидации' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'На сервере произошла обика' });
    });
};

module.exports.deleteCards = (req, res) => {
  Cards.findByIdAndDelete(req.params.cardId)
    .orFail(new Error('Not Found'))
    .then(() => {
      res.send('Карточка удалена');
    })
    .catch((err) => {
      if (err.message === 'Not Found') {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: 'Карточка с указанным _id не найден' });
      }
      if (err.name === 'CastError') {
        return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Не корректный _id карточки' });
      }
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.likeCard = (res, req) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('Not Found'))
    .catch((err) => {
      if (err.message === 'Not Found') {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: 'Карточка с указанным _id не найден' });
      }
      if (err.name === 'CastError') {
        return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Не корректный _id карточки' });
      }
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: 'На сервере произошла ошибка' });
    });
};
module.exports.dislikeCard = (res, req) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('Not Found'))
    .catch((err) => {
      if (err.message === 'Not Found') {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: 'Карточка с указанным _id не найден' });
      }
      if (err.name === 'CastError') {
        return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Не корректный _id карточки' });
      }
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: 'На сервере произошла ошибка' });
    });
};
