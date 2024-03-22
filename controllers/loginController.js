const User = require("../models/User");
const CryptoJs = require("crypto-js")
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
    const {user, pwd} = req.body
    if (!user||!pwd) return res.status(401).json("Field cannot be empty")
    try {
        const foundUser = await User.findOne({username: user}).exec()
        if (!foundUser) return res.status(401).json("Username not found")

        const decryptPwd = CryptoJs.AES.decrypt(foundUser.password, process.env.HASHEDPWD).toString(CryptoJs.enc.Utf8);
        if(pwd !== decryptPwd) {
            return res.status(401).json("Password is incorrect")
        }
        
        const {password, ...others} = foundUser._doc
        const access_token = jwt.sign(
            {id : foundUser._id, isAdmin:foundUser.isAdmin},
            process.env.ACCESS_TOKEN,
            {expiresIn: "3d"}
        )
        res.status(200).json({ others, access_token })

    } catch (error) {
        res.status(500).json(error)
    }


}

module.exports = {handleLogin}