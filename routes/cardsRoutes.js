const cardsRoutes = require("express").Router();
const {
  getCards,
  createCards,
  deleteCards,
  dislikeCard,
  likeCard,
} = require("../controllers/card");

cardsRoutes.get("/", getCards);
cardsRoutes.post("/", createCards);
cardsRoutes.delete("/:cardId", deleteCards);
cardsRoutes.put("/:cardId/likes", likeCard);
cardsRoutes.delete("/:cardId/likes", dislikeCard);

module.exports = cardsRoutes;
