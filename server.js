const express = require('express');
const path = require('path');
// const changeStreamUser = require('./models/change-streams/changeStreamUser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // n4
require('./utils/globalHelpers');

//Init Express
const app = express();

// DATABASE
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true, //Applied after DeprecationWarning and goal: new Server Discover and Monitoring engine || // comment this out when this error occurs: MongoTimeoutError: Server selection timed out after 30000 ms || || But be aware that things can not work properly
    useFindAndModify: false // DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated
}
mongoose
    .connect(process.env.MONGO_KEY, options)
    .then(() => console.log(`MongoDB Connected...`))
    .catch(err => console.log(err));
// collection changeStreams
// changeStreamUser();
// Endcollection changeStreams
// END DATABASE

// MIDDLEWARES
app.use(express.json()); //n1
app.use(cors()); //n2
// routes
app.use('/api/email', require('./routes/email'));
app.use('/api/user', require('./routes/user'));
app.use('/api/favorite', require('./routes/user/favorite'));
app.use('/api/product', require('./routes/product'));
app.use('/api/category', require('./routes/product/category'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
// Serve static files such as images, CSS files, and JavaScript files for the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))
// END MIDDLEWARES

// This solves the "Not found" issue when loading an URL other than index.html.
app.get('/*', (req, res) => { //n3
  res.sendFile(path.join(__dirname + '/client/build/index.html'), err => {
    if (err) { res.status(500).send(err) }
  })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


// NOTES
// n1: bodyparser middleware - Allow the app to accept JSON on req.body || replaces body-parser package
// n2: this was used before:
/*
// CORS - configure an Express server with CORS headers (because the React app is going to be published in a different port), JSON requests, and /api as the path
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     next();
// });
 */
// n3 : resource: https://tylermcginnis.com/react-router-cannot-get-url-refresh/
// prior setting:
/* app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + 'client/build/index.html')) // the "not found" issue may be occured becase of this path. client requires a slash before.
// })
n4: environment varibles works everywhere with dotenv, including controllers
*/