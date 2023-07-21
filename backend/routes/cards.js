const cardsRouter = require('express').Router();

const {
  cardJoiValidation,
  cardIdValidation,
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
cardsRouter.delete('/:cardId', cardIdValidation, deleteCard);
cardsRouter.put('/:cardId/likes', cardIdValidation, likeCard);
cardsRouter.delete('/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = cardsRouter;
