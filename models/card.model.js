const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
const path            = require('path');
const multer          = require('multer');
const { generate }    = require('./helpers');

class MultilingualString {

}

const CardSchema = new Schema({
    category: Number,
    title: Object,
    price: Number,
    discount: Object,
    imageUrls: Array,
    dateOfRes: String,
    colors: Array,
    description: Object,
    feutures: Array
});