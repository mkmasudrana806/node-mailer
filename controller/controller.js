const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const { EMAIL, PASSWORD } = require("../env");

// send mail from real account
const sendRealEmail = async (req, res) => {
  // email from client route
  const { userEmail } = req.body;
  console.log("user email is ", userEmail);

  // config file
  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  // this is transporter to transport client mail
  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });

  // body of the mail
  let response = {
    body: {
      intro: "Your bill has arriaved",
      table: {
        data: [
          {
            item: "Nodemailer Stack Book",
            description: "A Backend Application",
            price: "$534",
          },
        ],
      },
      outro: "Looking forward to do more business",
    },
  };

  // generate mail template
  let mail = MailGenerator.generate(response);

  // message
  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "Your Order History",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then((info) => {
      console.log("after sending email, info is: ", info);
      return res.status(201).json({ message: "you should recieve and email" });
    })
    .catch((error) => {
      console.log("error while sending email", error);
      return res.status(500).json({ error });
    });

  res.status(201).json("email send succefully");
};

// send mail from fake account
const sendEmail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  // create a transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const message = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  };

  transporter
    .sendMail(message)
    .then((info) =>
      res.status(201).json({
        message: "you should recieve an email",
        info: info.messageId,
        previev: nodemailer.getTestMessageUrl(info),
      })
    )
    .catch((error) => res.status(500).json({ error }));
};

const signup = (req, res) => {
  res.status(201).send("signup successfully");
};

const getbill = (req, res) => {
  res.status(201).send("bill is paid ");
};

module.exports = {
  signup,
  getbill,
  sendEmail,
  sendRealEmail,
};
