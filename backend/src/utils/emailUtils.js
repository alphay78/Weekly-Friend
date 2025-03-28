const nodemailer = require('nodemailer');

async function sendResetEmail(email, resetLink) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        text: `To reset your password, click the link: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);
}

module.exports = { sendResetEmail };
