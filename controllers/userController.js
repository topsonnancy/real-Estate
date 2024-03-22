const User = require("../models/User");
const CryptoJs = require("crypto-js");

const updateUser = async (req, res) => {
    const { user, contact, email, image, pwd } = req.body;
    if (!user ||!contact ||!email ||!pwd ||!image) return res.status(401).json("Field cannot be empty");
    try {
        const foundUser = await User.findOne({_id: req.params.id}).exec();
        if (!foundUser) return res.status(401).json("User not found");
        
        const encryptPwd = CryptoJs.AES.encrypt(pwd, process.env.HASHEDPWD);
        if (user) foundUser.username = user
        if (contact) foundUser.contact = contact
        if (email) foundUser.email = email
        if (image) foundUser.image = image
        if (pwd) foundUser.password = encryptPwd
        const result = await foundUser.save()
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json(`Error: ${error.message}`)  
    }

}

const deleteUser = async (req, res) => {
    try {
        const foundUser = await User.findOne({_id: req.params.id}).exec();
        if (!foundUser) return res.status(401).json("User not found");
        const result = await foundUser.deleteOne({ _id: req.params.id})
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json(`Error: ${error.message}`)  
    }

}

const getUser = async (req, res) => {
  try {
    const foundUser = await User.findOne({_id: req.params.id}).exec();
    if (!foundUser) return res.status(401).json("User not found");
    res.status(200).json(foundUser)

  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }

}

const getAllUsers = async (req, res) => {
    try {
        const foundUser = await User.find().exec();
        res.status(200).json(foundUser);
}
catch (error) {
    res.status(500).json(`Error: ${error.message}`)
}

} 

module.exports = {updateUser, deleteUser, getUser, getAllUsers}