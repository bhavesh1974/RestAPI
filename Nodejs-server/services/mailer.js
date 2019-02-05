const nodemailer = require("nodemailer");
const config = require("../config/config");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email.id,
    pass: config.email.password
  }

  //     sendgridTransport({
  //         auth: {
  //             api_key: config.email.key
  //         }
  //     })
});

module.exports.sendEmail = function (data) {
  admin = () => {
    return {
      from: "vatsalshah2210@gmail.com",
      to: "vatsalshah2210@gmail.com",
      subject: "Error in Speak service",
      html: "Error Found in at " +
        new Date() +
        "\n\n" +
        data.err_msg +
        "\n\n" +
        data.err_stack
    };
  };

  user = () => {
    const host = data.host;
    const token = data.token;
    const email = data.email;
    const name = data.name;

    return {
      from: "vatsalshah2210@gmail.com",
      to: email,
      subject: "Verify your account",
      html: `Hello ${name},\n\nPlease verify your account by clicking the <a href=http:\/\/${host}\/auth\/confirmation\/${token}>link.</a>`
    };
  };

  const emailData = data.isAdmin === 1 ? admin() : user();
  if (config.email.action == "true") {
    transporter.sendMail(emailData, function (error, info) {
      if (error) {
        logger.error("Mail Sent Error: ", error);
      } else {
        logger.info("Mail Sent Successfully");
      }
    });
  } else {
    logger.info("Mail service is disabled.");
  }
};