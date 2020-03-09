const express = require('express');
const router = express.Router();
const cardService = require('../services/card.services');

router.get('/category', getByCategory);
router.get('/card/:id', getById);
router.post('/cart', getCardsArray);

function getByCategory(req, res, next) {
    const {categoryId, skpi} = req.params;
    cardService.getByCategory(categoryId, skpi)
        .then(cards => cards ? res.json(cards) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    const id = req.params.id;
    cardService.getById(id)
        .then(card => card ? res.json(card) : res.sendStatus(404))
        .catch(err => next(err));
}

function getCardsArray(req, res, next) {
    const arr = req.body.cards;
    cardService.getCardsArray(arr)
        .then(cards => cards ? res.json(cards) : res.sendStatus(404))
        .catch(err => next(err))
}