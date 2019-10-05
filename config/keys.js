const dotenv = require('dotenv').config();
//create in the root .env file your respect keys, API, tokens.
//KEY_NAME="yourSecretTokenHere"
module.exports = {
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET
};