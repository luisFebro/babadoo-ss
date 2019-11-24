const validateContact = require('../utils/validation/validateContact');
const sgMail = require('@sendgrid/mail');

const {
    getWelcomeAndConfirmTemplate,
    getBuyRequestTemplate,
} = require('../templates/email');

// MESSAGES
const ok = {
    sent: "Mail sent successfully.",
    confirm: 'Um email de confirmação foi enviado para você.',
    confirmed: 'Seu Email foi confimado com sucesso!',
    resend: 'Email de Confirmação Reenviado, verifique também sua caixa de spam',
    successBuyRequest: "Pedido registrado e enviado com sucesso! Acompanhe o andamento pela sua conta de acesso!",
}
const error = {
    notSent: "Email não foi enviado!",
    couldNotFind: 'Não encontramos você!',
    alreadyConfirmed: 'Your email was already confirmed',
    systemError: "Ocorreu esse problema técnico: ",
}
const valid = {
    anyField: "Preencha todas os campos",
    noName: "Por favor, insira seu nome",
    noContact: "Por favor, insira seu whatsapp",
    noAddress: "Por favor, insira seu endereço",
    wrongFormat: {
        number: "Você digitou um formato de número errado",
    }
}
const msg = (text, systemError = "") => ({ msg: text + systemError});
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
        console.log(ok.sent);
    } catch(err) {
        console.error(msg(error.notSent, err.toString()));
        if(err.toString().includes("Maximum credits exceeded")) {
            console.log("Change to nodemailer")
        }
    }
}
// END SEND EMAIL

exports.sendWelcomeConfirmEmail = (req, res) => {
    const { email, bizName } = req.body;
    const mainTitle = `Seja Bem Vindo(a) a ${bizName}`;
    sendEmail(email, mainTitle, getWelcomeAndConfirmTemplate(req.body))
    .then(() => res.json(msg(ok.confirm)))
    .catch(err => res.json(msg(error.systemError, err)))
}

exports.sendBuyRequestEmail = (req, res) => {
    const toEmail = req.body.bizEmail;
    const bizName = req.body.bizName.cap();
    const mainTitle = `${bizName} - Pedidos de Compra`;
    if(validateBuyRequest(req, res) === 'ok'){
        sendEmail(toEmail, mainTitle, getBuyRequestTemplate(req.body))
        .then(() => res.json(msg(ok.successBuyRequest)))
        .catch(err => res.json(msg(error.systemError, err)))
    }
}

// VALIDATION
const validateBuyRequest = (req, res) => {
    const { name, phone, address } = req.body;

    if(!name && !phone && !address ) {
        return res.status(400).json(msg(valid.anyField));
    }

    if(!name || !phone || !address ) {
        if(!name){
            return res.status(400).json(msg(valid.noName));
        }
        if(!phone){
            return res.status(400).json(msg(valid.noContact));
        }
        if(!address){
            return res.status(400).json(msg(valid.noAddress));
        }
    }
    if(!validateContact(phone)) {
        return res.status(400).json(msg(valid.wrongFormat.number))
    }

    return "ok"; //n1
}
// END VALIDATION


/* COMMENTS
n1: // if any blocking condition is true, then "ok" will be the word to allow sending the email
*/

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