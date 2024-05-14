const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        pass: 'josy lwcf pzzk rmjt',
        user: 'brunkstartks@gmail.com'
    }
});
module.exports = transporter;

//josy lwcf pzzk rmjt 