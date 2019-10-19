const dotenv = require('dotenv').config();
//create in the root .env file your respect keys, API, tokens.
//KEY_NAME="yourSecretTokenHere"
module.exports = {
  mongoKey: process.env.MONGO_KEY,
  jwtSecret: process.env.JWT_SECRET,
  nodemailerEmail: process.env.NODEMAILER_EMAIL,
  nodemailerPassword: process.env.NODEMAILER_PASSWORD,
  pusherKey: process.env.PUSHER_KEY,
  pusherSecret: process.env.PUSHER_SECRET
};