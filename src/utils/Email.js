const nodemailer = require("nodemailer");
const Handlebars = require("handlebars");
const fs = require("fs");
const { convert } = require('html-to-text');
class Email {
  constructor(user, url) {
    this.user = user;
    this.from = "lvdat20@clc.fitus.edu.vn";
    this.to = user.email;
    this.name = user.name?.split(" ")[0];
    this.url = url;
  }

  newTransport() {
    let transport = null;

    if (process.env.NODE_ENV === 'development') {
      transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: 'c60e9e238b8a8f',
          pass: 'e8e7e363c7323f'
        }
      })
    } else {
      // not handled
      transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_PASSWORD,
        }
      })
    }

    return transport;
  }

  async send(subject) {
    // 0) prepare html form
    const htmlFileString = fs.readFileSync(`${__dirname}/MailTemplate/verify.html`, 'utf8');
    let html = Handlebars.compile(htmlFileString);
    html = html({name: this.user.name || "User", url: this.url});
    const text = convert(html);
    // 1) create transport
    const transporter = this.newTransport();
  
    // 2) create mail options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html,
      text: text,
    }

    // 3) sendemail
    await transporter.sendMail(mailOptions)
  }
}

module.exports = Email;