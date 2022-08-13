const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'gmail.com', // process.env.EMAIL_HOST,
      service: 'gmail', //process.env.EMAIL_SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: 'slproposals786@gmail.com', //process.env.EMAIL_USER,
        pass: 'jvihhmwmwpqeyhkk', //process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text,
    });
  } catch (e) {
    return e
  }
};

module.exports = sendEmail;