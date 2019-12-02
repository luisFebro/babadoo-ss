const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = "products"
const addDashesToString = require('../../utils/string/addDashesToString');

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
    },
    quantity: {
        type: Number,
        default: 1
    },
    sold: {
        type: Number,
        default: 0
    },
    link: {
        type: String,
    },
    isReadyToPopulate: {
        type: Boolean,
        default: false
    }
}


const productSchema = new Schema(data, { timestamps: true });
productSchema.pre('save', function(next) {
    this.link = addDashesToString(this.title);
    next();
});
module.exports = mongoose.model('Product', productSchema, collectionName);



