const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const app = express();
const path = require('path');

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../client/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../client/build/index.html'))
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/form', (req, res) => {
    const owner = 'Babadoo';
    const clientRaw = req.body.name;
    const client = clientRaw.charAt(0).toUpperCase() + clientRaw.slice(1)
    const htmlEmail = `
        <center>
            <header">
                 <img style="box-shadow: 0 19px 38px rgba(0,0,0,0.20), 0 15px 12px rgba(0,0,0,0.12);" src="https://imgur.com/9GjtAiW.png" width="200px" height="200px"/>
            </header>
        </center>
        <h1><center>Real Time Report</center></h1>
        <h3>Client Infos:</h3>
        <ul>
          <li>Name: ${client}</li>
          <li>Contact: ${req.body.phone}</li>
          <li>Delivery Address: ${req.body.address}</li>
          <li>Additional Infos: ${req.body.additional}</li>
        </ul>
        <h3>Purchase Request Infos:</h3>
        <ul>
          <li>Quantity and Items(ref): <br/>${req.body.itemDescription}</li>
          <li><h3>${req.body.totalPay}</h3></li>
        </ul>
        <footer>
            <h4><strong>Report generated after your client buy some product from ${owner} online</strong></h4>
        </footer>
    `;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'babadooweb@gmail.com', // generated ethereal user
            pass: 'babadoo2019' // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: `"${owner} - Purchase Request" babadooweb@gmail.com`, // sender address
        to: ['babadooweb@gmail.com'], // 7229952@gmail.com 'babadoosexy@gmail.com', list of receivers babadoo.sexyshop.lingeries@gmail.com
        subject: `One more! New purchase from ${client}`, // Subject line
        text: 'no-message-sent-ignore-here', // plain text body
        html: htmlEmail // html body
    };

    // CONSOLE LOG - send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

});

const PORT = process.env.PORT || 6100;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});