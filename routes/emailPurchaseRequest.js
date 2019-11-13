const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const { nodemailerEmail, nodemailerPassword } = require('../config/keys');


// @route   POST api/emails/client/welcome
// @desc    Send Email to client after register
// @access  Private
router.post('/client/welcome', (req, res) => {
    console.log("req.body from postEmail", req.body);
    const owner = 'Babadoo';
    const clientRaw = req.body.name;
    const client = clientRaw.charAt(0).toUpperCase() + clientRaw.slice(1)
    const htmlEmail = `
        <center>
            <header">
                 <img style="box-shadow: 0 19px 38px rgba(0,0,0,0.20), 0 15px 12px rgba(0,0,0,0.12);" src="https://imgur.com/9GjtAiW.png" width="200px" height="200px"/>
            </header>
        </center>
        <h1><center>Lingeries e Acessórios Eróticos</center></h1>
        <ul>
          <li><h3>Embalagens Discretas</h3></li>
          <li><h3>Entregamos por toda a cidade</h3></li>
        </ul>
        <footer>
            <h3><strong>Contato/Whatsapp: (92) 99506-6603</strong></h3>
        </footer>
    `;

    let transporter = nodemailer.createTransport({
        service: "Hotmail", //No need to specify host and port // resrc: https://nodemailer.com/smtp/well-known/
        // host: 'smtp.gmail.com',
        // port: 465, // or 587 for insecure port (secure: false)
        // secure: true, // true for 465, false for other ports
        auth: {
            user: nodemailerEmail, // generated ethereal user
            pass: nodemailerPassword // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        // The title along with the email replaces the usual account's name as a title
        from: `"Babadoo - ${client}, cadastro" babadooweb@hotmail.com`,
        to: req.body.email, //'babadoosexy@gmail.com'  , list of receivers
        subject: `Seja Bem Vindo a Babadoo, ${client}`, // Subject line
        text: 'no-message-sent-ignore-here', // plain text body
        html: htmlEmail // html body
    };

    // CONSOLE - send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log("nodeMailerClientWelcomeError", error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
    res.json({ msg: "email sent successfully!"})
});


// @route   POST api/emails/admin/buy-request
// @desc    Send Email to Admin when a client makes a purchase Request
// @access  Private
router.post('/admin/buy-request', (req, res) => {
    const owner = 'Babadoo';
    const clientRaw = req.body.name;
    const client = clientRaw.charAt(0).toUpperCase() + clientRaw.slice(1)
    const htmlEmail = `
        <center>
            <header">
                 <img style="box-shadow: 0 19px 38px rgba(0,0,0,0.20), 0 15px 12px rgba(0,0,0,0.12);" src="https://imgur.com/9GjtAiW.png" width="200px" height="200px"/>
            </header>
        </center>
        <h1><center>Relatório em Tempo Real</center></h1>
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

    const credentials = {
        host: 'smtp.gmail.com',
        port: 587, // or 587 for insecure port (secure: false)
        secure: false, // true for 465, false for other ports
        auth: {
            user: nodemailerEmail, // generated ethereal user
            pass: nodemailerPassword // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    }

    let transporter = nodemailer.createTransport(credentials);

    let mailOptions = {
        from: `"${owner} - Pedidos de Compra" babadooweb@gmail.com`, // sender address
        to: ['babadooweb@gmail.com'], //'babadoosexy@gmail.com'  , list of receivers
        subject: `Opa! Novo Pedido de ${client}`, // Subject line
        text: 'no-message-sent-ignore-here', // plain text body
        html: htmlEmail // html body
    };

    // CONSOLE - send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
    res.json({ msg: "email sent successfully!"})
});

module.exports = router;

