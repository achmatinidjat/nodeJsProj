const nodemailer = require('nodemailer');
const config = require("./config");

module.exports = function(email, subject, message) {

    const mailTransport = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: { user: config.email.login, pass: config.email.pass },
        tls: { rejectUnauthorized: false }
    });

    mailTransport.sendMail({
        from: 'krit-cours',
        to: email,
        subject: subject,
        text: message
    }, function(err, info) {
    });

};