const User = require("../models/User");
const CryptoJs = require("crypto-js")

const handleRegister = async (req, res) => {
    const {user, contact, email, image, pwd} = req.body

    if (!user ||!contact || !email || !pwd) return res.status(401).json("Field cannot be empty")
    try {
        encryptPwd = CryptoJs.AES.encrypt(pwd, process.env.HASHEDPWD)
        const newUser = await User.create({
            username: user,
            contact: contact,
            email: email,
            image: image,
            password: encryptPwd   
        }) 
             
    res.status(200).json(newUser);

    } catch (error) {
     res.status(500).json(`Error: ${error.message}`);
    }
}

module.exports = {handleRegister}