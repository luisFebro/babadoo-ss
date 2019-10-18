const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = "products";
const moment = require('moment');

//Set local time:
//e.g Outubro 10º 2019, 8:53:49 pm
moment.locale('pt-BR');
let brTime = moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a');

const data = {
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: { //category
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "img/products/product-avatar.png"
    },
    price: {
        type: Number,
        default: 40,
        required: true
    },
    company: {
        type: String,
        default: ""
    },
    info: {
        type: String,
        default: ""
    },
    inCart: {
        type: Boolean,
        default: false
    },
    isAddedToFav: {
        type: Boolean,
        default: false
    },
    count: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    },
    registerDate: {
        type: String,
        default: brTime
    },
    systemDate: {
        type: Date,
        default: Date.now
    }
}

const productSchema = new Schema(data);
module.exports = mongoose.model('Product', productSchema, collectionName);



