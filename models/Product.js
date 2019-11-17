const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = "products";
const moment = require('moment');

//Set local time:
//e.g Outubro 10º 2019, 8:53:49 pm
moment.updateLocale('pt-BR');
let brTime = moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a');

const data = {
    category: {
        type: Schema.ObjectId,
        ref: "Category",
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    price: {
        type: Number,
        default: 40,
        required: true
    },
    info: {
        type: Schema.ObjectId,
        ref: 'ProductInfo',
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    registerDate: {
        type: String,
        default: brTime
    }
}

const productSchema = new Schema(data, { timestamps: true });
module.exports = mongoose.model('Product', productSchema, collectionName);



