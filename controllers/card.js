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
      res.send(card);
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
      res.send({ message: 'Карточка удалена' });
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

const handleLike = (req, res, options) => {
  const action = options.addLike ? '$addToSet' : '$pull';
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { [action]: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Карточка не найдена' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Не корректный _id карточки' });
      }
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: 'Не удалось изменить карточку' });
    });
};

module.exports.likeCard = (req, res) => {
  handleLike(req, res, { addLike: true });
};

module.exports.dislikeCard = (req, res) => {
  handleLike(req, res, { addLike: false });
};
