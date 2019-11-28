const nodemailer = require('nodemailer');

const credentials = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_EMAIL_SENDER,
        pass: process.env.NODEMAILER_EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
}

const transporter = nodemailer.createTransport(credentials)

module.exports = async (to, mainTitle, content) => {
    const contacts = {
        from: `${mainTitle} <${process.env.NODEMAILER_EMAIL_SENDER}>`,
        to
    }

    const email = Object.assign({}, content, contacts)
    return await transporter.sendMail(email)
}