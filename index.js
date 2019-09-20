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
    const owner = 'Babadoo';
    const clientRaw = req.body.name;
    const client = clientRaw.charAt(0).toUpperCase() + clientRaw.slice(1)
    const htmlEmail = `
        <center>
            <header">
                 <img style="box-shadow: 0 19px 38px rgba(0,0,0,0.20), 0 15px 12px rgba(0,0,0,0.12);" src="https://imgur.com/9GjtAiW.png" width="200px" height="200px"/>
            </header>
        </center>
        <h1><center>Relatório Descritivo</center></h1>
        <h3>Informações do Cliente:</h3>
        <ul>
          <li>Nome: ${client}</li>
          <li>Contato/Whatsapp: ${req.body.phone}</li>
          <li>Endereço para Entrega: ${req.body.address}</li>
          <li>Informações Adicionais: ${req.body.additional}</li>
        </ul>
        <h3>Informações do Pedido:</h3>
        <ul>
          <li>Quantidades e Items(ref): <br/>${req.body.itemDescription}</li>
          <li><h3>${req.body.totalPay}</h3></li>
        </ul>
        <footer>
            <h4><strong>Relatório gerado após conclusão de compra pela ${owner} online</strong></h4>
            <h4><strong>Visite sua loja <a href="https://babadoo.herokuapp.com">AQUI</a></strong></h4>
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
        from: `"${owner} - Pedidos de Compra" babadooweb@gmail.com`, // sender address
        to: ['babadoosexy@gmail.com', 'babadooweb@gmail.com'], // '' list of receivers babadoo.sexyshop.lingeries@gmail.com
        subject: `Opa! Novo Pedido de ${client}`, // Subject line
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});