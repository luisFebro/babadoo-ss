const express = require('express');
const path = require('path');

//Init Express
const app = express();

// Bodyparser Middleware
app.use(express.json());
//from email PurchaseRequest (this is the former way, use express for body parser)
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// DB Config
// const db = config.get('mongoURI');


// Use Routes
app.use('/api/form', require('./routes/api/emailPurchaseRequest'));

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'client/build/index.html'))
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});