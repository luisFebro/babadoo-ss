const sgMail = require('@sendgrid/mail');
const {
    getWelcomeAndConfirmTemplate,
    getBuyRequestTemplate,
} = require('../templates/email');

// MESSAGES
const msgs = {
    confirm: 'Um email foi enviado para o seu email. Por favor, confirme seu email',
    confirmed: 'Your email is confirmed!',
    resend: 'Email de Confirmação Reenviado, verifique também sua caixa de spam',
    couldNotFind: 'Não encontramos você!',
    alreadyConfirmed: 'Your email was already confirmed',
    successBuyRequest: "Pedido registrado com sucesso!"
}
// END MESSAGES

// SEND EMAIL
sgMail.setApiKey(process.env.SEND_GRID_KEY);
const sendEmail = async (toEmail, mainTitle, content) => {
    const contacts = {
        isMultiple: true, // the recipients can't see the other ones when this is on
        from: `${mainTitle} <${process.env.EMAIL_BIZ}>`,
        to: [toEmail, process.env.EMAIL_DEV] // take EMAIL_DEV away if there is more than 50 emails a day.
    }

    // Combining the content and contacts into a single object that can be passed to SendGrid.
    const emailContent = Object.assign({}, content, contacts)

    try {
        await sgMail.send(emailContent);
        console.log(`Mail sent successfully.`);
    } catch(error) {
        console.error(error.toString());
    }
}
// END SEND EMAIL

exports.sendWelcomeConfirmEmail = (req, res) => {
    const { name, email } = req.body;
    const mainTitle = "Seja Bem Vindo(a) a Sexy Store"
    const client = name.charAt(0).toUpperCase() + name.slice(1)
    sendEmail(email, mainTitle, getWelcomeAndConfirmTemplate(client))
    .then(() => res.json({ msg: msgs.confirm }))
}

exports.sendBuyRequestEmail = (req, res) => {
    const toEmail = req.body.businessInfo.bizEmail;
    const bizName= req.body.businessInfo.bizName;
    const mainTitle = `${bizName} - Pedidos de Compra`;
    sendEmail(toEmail, mainTitle, getWelcomeAndConfirmTemplate(req.body))
    .then(() => res.json({ msg: msgs.successBuyRequest }));
}


// EXEMPLE
// const User = require('../user.model')
// The callback that is invoked when the user submits the form on the client.
// exports.collectEmail = (req, res) => {
//   const { email } = req.body

//   User.findOne({ email })
//     .then(user => {

//       // We have a new user! Send them a confirmation email.
//       if (!user) {
//         User.create({ email })
//           .then(newUser => sendEmail(newUser.email, templates.confirm(newUser._id)))
//           .then(() => res.json({ msg: msgs.confirm }))
//           .catch(err => console.log(err))
//       }

//       // We have already seen this email address. But the user has not
//       // clicked on the confirmation link. Send another confirmation email.
//       else if (user && !user.confirmed) {
//         sendEmail(user.email, templates.confirm(user._id))
//           .then(() => res.json({ msg: msgs.resend }))
//       }

//       // The user has already confirmed this email address
//       else {
//         res.json({ msg: msgs.alreadyConfirmed })
//       }

//     })
//     .catch(err => console.log(err))
// }

// // The callback that is invoked when the user visits the confirmation
// // url on the client and a fetch request is sent in componentDidMount.
// exports.confirmEmail = (req, res) => {
//   const { id } = req.params

//   User.findById(id)
//     .then(user => {

//       // A user with that id does not exist in the DB. Perhaps some tricky
//       // user tried to go to a different url than the one provided in the
//       // confirmation email.
//       if (!user) {
//         res.json({ msg: msgs.couldNotFind })
//       }

//       // The user exists but has not been confirmed. We need to confirm this
//       // user and let them know their email address has been confirmed.
//       else if (user && !user.confirmed) {
//         User.findByIdAndUpdate(id, { confirmed: true })
//           .then(() => res.json({ msg: msgs.confirmed }))
//           .catch(err => console.log(err))
//       }

//       // The user has already confirmed this email address.
//       else  {
//         res.json({ msg: msgs.alreadyConfirmed })
//       }

//     })
//     .catch(err => console.log(err))
// }