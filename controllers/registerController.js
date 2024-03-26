const User = require("../models/User");
const CryptoJs = require("crypto-js");
const nodemailer = require("nodemailer");

const handleRegister = async (req, res) => {
  const { user, contact, email, image, pwd } = req.body;

  if (!user || !contact || !email || !pwd)
    return res.status(401).json("Field cannot be empty");

  try {
    // Encrypt password
    const encryptPwd = CryptoJs.AES.encrypt(pwd, process.env.HASHEDPWD);

    // Create new user
    const newUser = await User.create({
      username: user,
      contact: contact,
      email: email,
      image: image,
      password: encryptPwd,
    });

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.APP_PASSWORD,
      },
    });

    // Define email options
    const mailOptions = {
      from: {
        name: "Tem Homes",
        address: process.env.USER,
      },
      to: email,
      subject: "Welcome to Tem Homes",
      text: "Welcome to the Team",
      html: "<b>Welcome on board!</b>\n\n <p> We are glad to have you here</p>",
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json(newUser);

  } catch (error) {
    res.status(500).json(`Error: ${error.message}`);
  }
};

module.exports = {handleRegister};












// const User = require("../models/User");
// const CryptoJs = require("crypto-js")



// const handleRegister = async (req, res) => {
//     const {user, contact, email, image, pwd} = req.body

//     if (!user ||!contact || !email || !pwd) return res.status(401).json("Field cannot be empty")
//     try {
//         encryptPwd = CryptoJs.AES.encrypt(pwd, process.env.HASHEDPWD)
//         const newUser = await User.create({
//             username: user,
//             contact: contact,
//             email: email,
//             image: image,
//             password: encryptPwd   
//         }) 
             
//     res.status(200).json(newUser);

//     } catch (error) {
//      res.status(500).json(`Error: ${error.message}`);
//     }
// }

// module.exports = {handleRegister}