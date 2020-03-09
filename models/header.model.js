const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    top: {
        card: Map,
        aboutUs: Map,
        contactUs: Map,
        blog: Map
    },

    main: {
        email: String,
        phone: String,
        logo: {
            ref: String,
            alt: Map
        }
    },
    nav: {
        "1": Map,
        "2": Map,
        "3": Map,
        "4": Map,
    },
});
