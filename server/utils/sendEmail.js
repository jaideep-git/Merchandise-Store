const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transpoter = nodeMailer.createTransport({
    service: "hotmail",
    auth: {
      user: "showmerchstore@outlook.com",
      pass: "Jaideep@9787",
    },
  });

  const mailOptions = {
    from: "showmerchstore@outlook.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transpoter.sendMail(mailOptions);
};

module.exports = sendEmail;
