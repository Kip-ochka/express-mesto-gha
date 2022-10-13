const Cards = require("../models/card");

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) =>
      res.status(500).send({
        message: "На сервере произошла обика",
        err,
      })
    );
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
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Ошибка валидации",
          err,
        });
      }
      return res.status(500).send({
        message: "На сервере произошла обика",
        err,
      });
    });
};

module.exports.deleteCards = (req, res) => {
  console.log(req.params);
  Cards.findByIdAndDelete(req.params.cardId)
    .orFail(new Error("Not Found"))
    .then(() => {
      res.send("Карточка удалена");
    })
    .catch((err) => {
      if (err.message === "Not Found") {
        return res
          .status(404)
          .send({ message: "Карточка с указанным _id не найден" });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Не корректный _id карточки" });
      }
      return res
        .status(500)
        .send({ message: "На сервере произошла ошибка" }, err);
    });
};

module.exports.likeCard = (res, req) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new Error("Not Found"))
    .catch((err) => {
      if (err.message === "Not Found") {
        return res
          .status(404)
          .send({ message: "Карточка с указанным _id не найден" });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Не корректный _id карточки" });
      }
      return res
        .status(500)
        .send({ message: "На сервере произошла ошибка" }, err);
    });
};
module.exports.dislikeCard = (res, req) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new Error("Not Found"))
    .catch((err) => {
      if (err.message === "Not Found") {
        return res
          .status(404)
          .send({ message: "Карточка с указанным _id не найден" });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Не корректный _id карточки" });
      }
      return res
        .status(500)
        .send({ message: "На сервере произошла ошибка" }, err);
    });
};
