const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    category: Number,
    title: Map,
    price: Number,
    discount: Number,
    discountInPercent: Number,
    imageUrls: Array,
    dateOfRes: String,
    colors: Array,
    description: Map,
    feutures: Array
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('cards', schema);