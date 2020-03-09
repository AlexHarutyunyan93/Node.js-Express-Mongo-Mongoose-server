const config = require('../config.json');
const db = require('../helpers/db');
const Card = db.Card;

module.exports = {
    getByCategory,
    getById,
    getCardsArray
};

async function getByCategory(id, skip){
    return await Card.find({category: id}, null, {skip: skip, limit: 12});
}

async function getById(id){
    return await Card.findById(id);
}

async function getCardsArray(array){
    return await Card.find({_id: array});
}
