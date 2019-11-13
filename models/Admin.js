const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = "admin";

const data = {
    promotions: {
        type: Object,
    },
    systemDate: { // not posted
        type: Date,
        default: Date.now
    }
}

const productSchema = new Schema(data);
module.exports = mongoose.model('Admin', productSchema, collectionName);



