const User = require("../models/User");
const CryptoJs = require("crypto-js")

const handleLogin = async (req, res) => {
    const {email, pwd} = req.body
    if (!email ||!pwd) return res.status(401).json("Field cannot be empty")
    try {
        const user = await User.findOne({email: email})
        if (!user) return res.status(401).json("Invalid email or password")
        const isMatch = CryptoJs.AES.decrypt(user.pwd, process.env.HASHEDPWD).toString(CryptoJs.enc.Utf8)
        if (isMatch!== pwd) return res.status(401).json("Invalid email or password")
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }


}