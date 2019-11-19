const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = "all-users";
const moment = require('moment');
require('moment/locale/pt-br');

//Set local time:
//e.g Outubro 10º 2019, 8:53:49 pm
moment.locale('pt-br');
const brTime = moment(Date.now()).format('Do MMM [às] h:mm, YYYY[.]');

const data = {
    isAdmin: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        trim: true,
        maxlength: 40,
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
        type: Schema.ObjectId,
        ref: 'Favorite'
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