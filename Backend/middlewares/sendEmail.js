const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, htmlContent) => {
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
        debug: true
    });

    try {
        // Send mail with defined transport object
        let info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: subject, // Subject line
            html: htmlContent, // HTML body
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error occurred while sending email:", error);
        throw new Error("Failed to send email");
    }
};

const sendConfirmationEmail = async (email, confirmationLink) => {
    const subject = "Confirm Your Email";
    const verificationLink = `http://localhost:5000/api/users/confimed/${confirmationLink}`;

    const htmlContent = `
        <p>Hello,</p>
        <p>Please click the following link to confirm your email:</p>
        <a href="${verificationLink}">Confirm Email</a>
    `;
    await sendEmail(email, subject, htmlContent);
};

const sendPasswordRecoveryEmail = async (email, recoveryLink) => {
    const subject = "Password Recovery";
    const verificationLink = `http://localhost:5000/api/users/reset/${recoveryLink}`;
    const htmlContent = `
        <p>Hello,</p>
        <p>You have requested to reset your password. Click the following link to reset your password:</p>
        <a href="${verificationLink}">Reset Password</a>
    `;
    await sendEmail(email, subject, htmlContent);
};

module.exports = { sendConfirmationEmail, sendPasswordRecoveryEmail };
