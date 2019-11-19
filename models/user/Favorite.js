const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = "user-favorites";

// PRODUCT INFO
// colors: {mainColor: String, options: Array}
const dataFavorite = {
    favoriteList: Array,
}
const FavoriteSchema = new Schema(dataFavorite, { timestamps: true });
module.exports = mongoose.model('Favorite', FavoriteSchema, collectionName);
