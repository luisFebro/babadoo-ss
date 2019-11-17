const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = "product-info";

// PRODUCT INFO
// colors: {mainColor: String, options: Array}
const dataProductInfo = {
    mainDescription: String,
    company: String,
    colors: Object,
    refCode: String,
    howToUse: String,
    weight: Number,
    sizeOrDimmension: Number,
    unitsPerPackage: Number,
}
const ProductInfoSchema = new Schema(dataProductInfo, { _id: false, timestamps: true });
module.exports = mongoose.model('ProductInfo', ProductInfoSchema, collectionName);
