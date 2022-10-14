const Cards = require('../models/card');

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => {
      res.send(cards);
    }).catch((err) => res.status(500).send({ message: 'На сервере произошла обика', err }));
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
        return res.status(400).send({
          message: 'Ошибка валидации',
          err,
        });
      }
      return res.status(500).send({
        message: 'На сервере произошла обика',
        err,
      });
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
          .status(400)
          .send({ message: 'Карточка с указанным _id не найден' });
      }
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'Не корректный _id карточки' });
      }
      return res
        .status(500)
        .send({ message: 'На сервере произошла ошибка' }, err);
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
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Не корректный _id карточки' });
      }
      return res
        .status(500)
        .send({ message: 'Не удалось изменить карточку' });
    });
};

module.exports.likeCard = (req, res) => {
  handleLike(req, res, { addLike: true });
};

module.exports.dislikeCard = (req, res) => {
  handleLike(req, res, { addLike: false });
};
