const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendEmail(to, subject, text) {
    try {
      const info = await this.transporter.sendMail({
        from: `${process.env.SMTP_USER}`,
        to,
        subject,
        text,
      });
      console.log("message send", info.messageId);
      return info;
    } catch (error) {
      console.error("Error sending email:", error.message);
      throw error;
    }
  }
}

module.exports = new EmailService();
