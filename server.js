const express = require('express');
const path = require('path');
const changeStreamUser = require('./models/change-streams/changeStreamUser');
// Database MongoDB
const mongoose = require('mongoose');
const { mongoKey } = require('./config/keys.js');
// End Database MongoDB

//Init Express
const app = express();

// CORS - configure an Express server with CORS headers (because the React app is going to be published in a different port), JSON requests, and /api as the path
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Bodyparser Middleware
// Allow the app to accept JSON on req.body
app.use(express.json());

// DATABASE CONFIG
// Connect to Mongo
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true, //Applied after DeprecationWarning and goal: new Server Discover and Monitoring engine
    useFindAndModify: false // DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated
}
mongoose
    .connect(mongoKey, options)
    .then(() => console.log(`MongoDB Connected...`))
    .catch(err => console.log(err));
// collection changeStreams
changeStreamUser();
// Endcollection changeStreams

// END DATABASE CONFIG

// Use Routes
app.use('/api/form', require('./routes/api/emailPurchaseRequest'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/auth', require('./routes/api/auth'));
// End Use Routes

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'client/build/index.html'))
})
// End

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});