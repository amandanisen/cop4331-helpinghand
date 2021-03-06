const nodemailer = require('nodemailer');

exports.sendConfirmationEmail = function({toUser, hash}) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD
      }
    })

    const message = {
    //   from: process.env.GOOGLE_USER,
    //   // to: toUser.email // in production uncomment this
    //   to: process.env.GOOGLE_USER,
    //   subject: 'Your App - Activate Account',
    //   html: `
    //     <h3> Hello ${toUser.username} </h3>
    //     <p>To activate your account please follow this link: <a target="_" href="${process.env.DOMAIN}/api/activate/user/${hash}">${process.env.DOMAIN}/activate </a></p>
    //   `
    }

    transporter.sendMail(message, function(err, info) {
      if (err) {
        rej(err)
      } else {
        res(info)
      }
    })
  })
}