const nodemailer = require('nodemailer');
require("dotenv").config();
const { MAIL,PASS } = process.env;
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        pass: PASS,
        user: MAIL
    }
});
module.exports = transporter;

//jnbej jmkl xynw qunn  