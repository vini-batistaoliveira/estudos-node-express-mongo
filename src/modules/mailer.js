const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');

// const {host, port, user, pass } = require('../config/mail');

// const transport = nodemailer.createTransport({
//     host,
//     port,
//     secure: true,
//     auth: { user, pass }
//   });

  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e0dbe1161aa1d1",
      pass: "7271b2ef25f220"
    }
  });

  const handlebarOptions = {
    viewEngine: {
      extName: '.html',
      partialsDir: path.resolve('./src/resources/mail/'),
      layoutsDir: path.resolve('./src/resources/mail/'),
      defaultLayout: '',
    },
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html',
  }

  transport.use('compile', hbs(handlebarOptions))
  
  module.exports = transport;