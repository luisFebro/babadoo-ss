const express = require('express');
const path = require('path');
// const changeStreamUser = require('./models/change-streams/changeStreamUser');
const cors = require('cors');
const mongoose = require('mongoose');
const { mongoKey } = require('./config/keys.js');

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
    .connect(mongoKey, options)
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
app.use('/api/emails', require('./routes/api/emailPurchaseRequest'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/admin', require('./routes/api/admin'));
// Serve static files from the React frontend app
// This solves the "Not found" issue when loading an URL other than index.html.
app.use(express.static(path.join(__dirname, 'client/build')))
app.get('/*', function(req, res) { //n3
  res.sendFile(path.join(__dirname + '/client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
// END MIDDLEWARES
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
//     res.sendFile(path.join(__dirname + 'client/build/index.html'))
// })
*/