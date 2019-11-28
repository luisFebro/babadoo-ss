const User = require('../models/user');
const sgMail = require('@sendgrid/mail');
const uuidv1 = require('uuid/v1');
const { msgG } = require('./_msgs/globalMsgs');
const { msg } = require('./_msgs/email');
const {
    getWelcomeAndConfirmTemplate,
    getBuyRequestTemplate,
} = require('../templates/email');

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
        console.log(msg('ok.sent'));
    } catch(err) {
        console.error(msg('error.notSent', err.toString()));
        if(err.toString().includes("Maximum credits exceeded")) {
            console.log("Change to nodemailer")
        }
    }
}
// END SEND EMAIL

exports.sendNewPasswordEmail = (req, res) => {
    const { email } = req.body;
    User.findOneAndUpdate(
    { email },
    { $set: {"tempAuthUserToken.this": `${uuidv1()}np`}},// np = new password
    { new: true },
    (err, user) => {
        if(err) res.status(400).json(msg('error.systemError', err))
        if(!user) return res.status(400).json(msg('error.notRegistered'))
        user.password = undefined;
        res.json(user);
    })
}

exports.sendWelcomeConfirmEmail = (req, res) => {
    const { email, bizName } = req.body;
    const mainTitle = `Seja Bem Vindo(a) a ${bizName}`;
    sendEmail(email, mainTitle, getWelcomeAndConfirmTemplate(req.body))
    .then(() => res.json(msg('ok.confirm')))
    .catch(err => res.json(msgG('error.systemError', err)))
}

exports.sendBuyRequestEmail = (req, res) => {
    const toEmail = req.body.bizEmail;
    const bizName = req.body.bizName;
    const mainTitle = `${bizName} - Pedidos de Compra`;
    sendEmail(toEmail, mainTitle, getBuyRequestTemplate(req.body))
    .then(() => res.json(msg('ok.successBuyRequest')))
    .catch(err => res.json(msgG('error.systemError', err)))
}



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