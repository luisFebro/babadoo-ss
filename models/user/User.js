const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = "all-users";

// TEMP AUTH USER ID
const dataTempAuthUserToken = {
    this: {
        type: String,
        default: '',
    },
    createdAt: { type: Date, default: Date.now, expires: '1m' }
}

const UserTokenSchema = new Schema(dataTempAuthUserToken);
// END TEMP AUTH USER ID


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
    // this will be replaced
    favoriteList: {
        type: Array,
        default: []
    },
    favoriteL: {
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
    registeredBy: {
        type: String,
        default: 'email',
    },
    isUserConfirmed: {
        type: Boolean,
        default: false
    },
    tempAuthUserToken: UserTokenSchema
}

const userSchema = new Schema(data, { timestamps: true }); //n1
//n1
module.exports = mongoose.model('User', userSchema, collectionName);


/* COMMENTS
n1: checking if the model exists then use it, else create it.
For this issue: OverwriteModelError: Cannot overwrite `User` model once compiled.
itis used becauseI have models/user both for auth and user.
*/


// n1 : { strict: false }The strict option, (enabled by default), ensures that values passed to our model constructor that were not specified in our schema do not get saved to the db.