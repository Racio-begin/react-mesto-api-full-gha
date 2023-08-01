const cardsRouter = require('express').Router();

const {
  cardJoiValidation,
  cardIdJoiValidation,
} = require('../middlewares/JoiValidator');

const {
  createCard,
  getAllCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.post('/', cardJoiValidation, createCard);
cardsRouter.get('/', getAllCards);
cardsRouter.delete('/:cardId', cardIdJoiValidation, deleteCard);
cardsRouter.put('/:cardId/likes', cardIdJoiValidation, likeCard);
cardsRouter.delete('/:cardId/likes', cardIdJoiValidation, dislikeCard);

module.exports = cardsRouter;
