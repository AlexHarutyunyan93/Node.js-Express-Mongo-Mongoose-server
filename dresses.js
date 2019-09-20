const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
const path            = require('path');
const multer          = require('multer');
const { generate }    = require('./helpers');

const DressSchema = new Schema({
    category: Number,
    title: Array,
    price: Number,
    discount: Number,
    imageUrls: Array,
    dateOfRes: String,
    colors: Array,
    description: Array,
    feutures: Array
});
const AboutSchema = new Schema({
    ru: {
        title: String,
        descTitle: String,
        description: String,
        feauturesTitle: String,
        feautures: Array
    },
    en: {
        title: String,
        descTitle: String,
        description: String,
        feauturesTitle: String,
        feautures: Array
    },
    am: {
        title: String,
        descTitle: String,
        description: String,
        feauturesTitle: String,
        feautures: Array
    }
});

const HeaderInfo = new Schema({
    logo: String,
    phone: String,
    email: String,
    ru: {
        top: {
            about: String,
            contacts: String,
            cart: String
        },
        middle: {
            placeholder: String
        },
        bottom: Array
    }
});

const HomePageSchema = new Schema({
    language: {
        ru: {
            specialCategory: Array,
            newCollection: String,
            sellOut: String,
            about: String
        },
        en: {
            specialCategory: Array,
            newCollection: String,
            sellOut: String,
            about: String
        },
        am: {
            specialCategory: Array,
            newCollection: String,
            sellOut: String,
            about: String
        }
    },
    specialCategory: Array,
    promoSlider: Array,
    newCollection: Array,
    sellOut: Array,
    about: {
        img: String,
        description: String
    }



});

const storage = multer.diskStorage({
    destination: './public/uploads/items',
    filename: function(req, file, cb){
        cb(null, `${file.fieldname}-${generate()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).array('file', 10);

function checkFileType(files, cb){
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(files.originalname).toLowerCase());
    const mimetype = filetypes.test(files.mimetype);
    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb('Error: Images Only!');
    }
}
const aboutCompany = mongoose.model('about', AboutSchema);
const Header       = mongoose.model('header',HeaderInfo);
const Dresses      = mongoose.model('dresses', DressSchema);
const HomePage     = mongoose.model('home-page', HomePageSchema);

module.exports = { Dresses, upload, HomePage, Header, aboutCompany };
