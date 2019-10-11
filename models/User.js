const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = "all-users";
// Moment
const moment = require('moment');
require('moment/locale/pt-BR.js');

//Set local time:
//e.g Outubro 10º 2019, 8:53:49 pm
moment.locale('pt-BR');
const brTime = moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a');

const userSchema = new Schema({
  name: {
    type: String,
    required: true
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
  registerDate: {
    type: String,
    default: brTime
  }
});

module.exports = User = mongoose.model('User', userSchema, collectionName);
