const nodemailer = require("nodemailer");
require("dotenv").config()
const path = require("path");
const User = require("./models/User");
const CryptoJs = require("crypto-js")

const {user, contact, email, image, pwd} = req.body
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

const mailOptions = {
from: {
    name: "Tem Tech",
    address: process.env.USER,
  },
 // sender address
    to: email, // list of receivers
    subject: "Welcome to Top Real", // Subject line
    text: "Welcome to the Team", // plain text body
    html: "<b>We are glad to have you on board</b>", // html body
    
}

const sendMail = async (transporter, mailOptions) => {
 try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully")
 } catch (error) {
    console.error(error) 
 }
}
sendMail(transporter,mailOptions);

module.exports = {sendMail}