const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = "admin";

const data = {
    businessInfo: {
        type: Schema.ObjectId,
        ref: 'BusinessInfo',
        required: true
    }
}

const productSchema = new Schema(data, { timestamps: true });
module.exports = mongoose.model('Admin', productSchema, collectionName);



