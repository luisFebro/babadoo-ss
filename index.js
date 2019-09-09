const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/form', (req, res) => {
    const htmlEmail = `
        <h1>A Babadoo tem um novo pedido!</h1>
        <h3>Descrição</h3>
        <ul>
          <li>Nome Cliente: ${req.body.name}</li>
          <li>Contato/Whatsapp: ${req.body.phone}</li>
          <li>Endereço para Entrega: ${req.body.address}</li>
          <li>Informações Adicionais: ${req.body.additional}</li>
        </ul>
    `;
    nodemailer.createTestAccount((err, account) => {

    });

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
        to: ['babadooweb@gmail.com', 'luis.felipe.bruno@hotmail.com'], // 'babadoo.sexyshop.lingeries@gmail.com' list of receivers babadoo.sexyshop.lingeries@gmail.com
        replyTo: "test@gmail.com",
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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});