const nodemailer = require('nodemailer');
require('dotenv').config();

class SendMail {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_LOGIN,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationLink(to, link) {
    this.transporter.sendMail({
      from: process.env.SMTP_LOGIN,
      to,
      subject: 'Активация Аккаунта на TSChat',
      text: `${to} активируйте аккаунт`,
      html: `
        <div>
          <h1>Активация аккаунта на TsChat</h1>
          <p>Для активации перейдите по ссылке ${process.env.SERVER_URL}/api/activate/${link}</p>
        </div>
      `,
    });
  }
}

module.exports = new SendMail();
