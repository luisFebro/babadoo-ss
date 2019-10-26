const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = "all-users";
const moment = require('moment');

//Set local time:
//e.g 26 de Out de 2019 às 17:25
moment.locale('pt-BR');
const brTime = moment(Date.now()).format('lll');
console.log(brTime);
const data = {
  name: {
    type: String,
    required: true,
    lowercase: false,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    default: ""
  },
  favoriteList: {
    type: Array,
    default: []
  },
  inCartList: {
    type: Array,
    default: []
  },
  messageList: {
    type: Array,
    default: []
  },
  couponsList: {
    type: Array,
    default: []
  },
  registerDate: {
    type: String,
    default: brTime
  },
}

const userSchema = new Schema(data); //n1
module.exports = mongoose.model('User', userSchema, collectionName);



// n1 : { strict: false }The strict option, (enabled by default), ensures that values passed to our model constructor that were not specified in our schema do not get saved to the db.