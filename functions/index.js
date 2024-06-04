const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY,
    },
});

// Función para enviar el correo
exports.sendEmailOnLogin = functions.auth.user().onCreate((user) => {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: user.email,
        subject: 'Nuevo inicio de sesión',
        text: `Hola ${user.displayName || user.email}, has iniciado sesión con éxito.`,
    };

    return sgMail.send(mailOptions)
        .then(() => console.log('Email sent'))
        .catch((error) => console.error(error));
});
