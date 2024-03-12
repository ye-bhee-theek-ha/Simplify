const nodemailer = require("nodemailer");

const sendConfirmationEmail = async (email, confirmationLink) => {
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
        subject: "Confirm Your Email", // Subject line
        html: `
          <p>Hello,</p>
          <p>Please click the following link to confirm your email:</p>
          <a href="${confirmationLink}">Confirm Email</a>
        `, // HTML body
      });
  
      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error("Error occurred while sending email:", error);
      throw new Error("Failed to send confirmation email");
    }
  };
  

  module.exports = sendConfirmationEmail;