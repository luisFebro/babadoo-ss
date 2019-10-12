const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = "products";
// Moment
const moment = require('moment');

//Set local time:
//e.g Outubro 10º 2019, 8:53:49 pm
moment.locale('pt-BR');
const brTime = moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a');

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {  //category
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: ""
  },
  info: {
    type: String,
    default: ""
  }
});

module.exports = Product = mongoose.model('Product', productSchema, collectionName);
