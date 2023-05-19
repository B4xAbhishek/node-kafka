require("dotenv").config()
const nodemailer = require('nodemailer');

const sendMail_to = 'officialabhishek99@gmail.com'
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lolmat.asia67@gmail.com',
      pass: process.env.GMAIL_PASSWORD
    }
  });

  let mailOptions = {
    from: '"no-reply" <lolmat.asia67@gmail.com>',
    to: sendMail_to,
    subject: 'Alert!',
    text: 'Hello World!',
    html: '<i>Hello World!</i>'
  };

 const sendMail = transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: to ', sendMail_to, mailOptions.subject + info.response);
    }
  });
  
  module.exports = sendMail 
