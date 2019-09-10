const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('contact');
});

app.post('/send', (req, res) => {
  const output = `
    <h1>A Babadoo tem um novo pedido!</h1>
    <h3>Descrição</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

   let transporter = nodemailer.createTransport({
     host: 'smtp.gmail.com',
     port: 587,
     secure: false, // true for 465, false for other ports
     auth: {
         user: 'babadooweb@gmail.com', // generated ethereal user
         pass: 'babadoo2019'  // generated ethereal password
     },
     tls:{
       rejectUnauthorized:false
     }
   });

   // setup email data with unicode symbols
   let mailOptions = {
       from: '"Babadoo loja web - novo pedido" Babadoo Web', // sender address
       to: ['babadooweb@gmail.com'], // 'babadoo.sexyshop.lingeries@gmail.com' list of receivers babadoo.sexyshop.lingeries@gmail.com
       subject: 'Babadoo loja web - novo pedido de compra', // Subject line
       text: 'no-message-sent-ignore-here', // plain text body
       html: output // html body
   };

   // send mail with defined transport object
   transporter.sendMail(mailOptions, (error, info) => {
       if (error) {
           return console.log(error);
       }
       console.log('Message sent: %s', info.messageId);
       console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

       res.render('contact', {msg:'PEDIDO ENVIADO! ENTRAREMOS EM CONTATO O MAIS BREVE POSSÍVEL'});
   });
});

 app.listen(3009, () => console.log('Server started...'));


