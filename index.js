const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const app = express();
const path = require('path');

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/form', (req, res) => {
    const htmlEmail = `
        <center>
            <header">
                 <img style="box-shadow: 0 19px 38px rgba(0,0,0,0.20), 0 15px 12px rgba(0,0,0,0.12);" src="https://imgur.com/9GjtAiW.png" width="200px" height="200px"/>
            </header>
        </center>
        <h1>A Babadoo tem um novo pedido!</h1>
        <h3>Descrição a seguir:</h3>
        <ul>
          <li>Nome Cliente: ${req.body.name}</li>
          <li>Contato/Whatsapp: ${req.body.phone}</li>
          <li>Endereço para Entrega: ${req.body.address}</li>
          <li>Informações Adicionais: ${req.body.additional}</li>
        </ul>
        <h3>Encomenda:</h3>
        <ul>
          <li>Quantidades e Items(ref): <br/>${req.body.itemDescription}</li>
          <br/>
          <li>Valor Total: ${req.body.totalPay}</li>
        </ul>
        <footer>
            <strong>Relatório de compra gerado pelo site Babadoo web</strong>
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
        from: '"Babadoo loja web - novo pedido" Babadoo Web', // sender address
        to: 'babadooweb@gmail.com', // 'babadoo.sexyshop.lingeries@gmail.com' list of receivers babadoo.sexyshop.lingeries@gmail.com
        subject: 'Babadoo loja web - novo pedido de compra', // Subject line
        text: 'no-message-sent-ignore-here', // plain text body
        html: htmlEmail // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        //res.render('contact', {msg:'PEDIDO ENVIADO! ENTRAREMOS EM CONTATO O MAIS BREVE POSSÍVEL'});
    });

});

// Resolving CORS policy issues
app.use(function(req, res, next) {
    res.header(“Access - Control - Allow - Origin”, “*”);
    res.header(“Access - Control - Allow - Methods”, “GET, PUT, POST, DELETE”);
    res.header(“Access - Control - Allow - Headers”, “Origin, X - Requested - With, Content - Type, Accept”);
    next();
});
app.options(“ * ”, cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});