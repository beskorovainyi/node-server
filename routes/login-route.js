const router = require('express').Router()
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const {asyncConfig} = require("config/async");
const User = mongoose.model('users');
const Token = mongoose.model('token')


//login user
router.post('/login',
    async (req, res) => {
      try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
          return res.status(404).json({massege: "User not found"})
        }
        const isPassValid = bcrypt.compareSync(password, user.password)
        if (!isPassValid) {
          return res.status(400).json({massege: "Invalid password"})
        }

        const access = jwt.sign({id: user.userId}, config.get("jwt.accessSecretKey"), {expiresIn: config.get("jwt.tokens.access.expiresIn")})
        const refresh = jwt.sign({id: user.userId}, config.get("jwt.refreshSecretKey"), {expiresIn: config.get("jwt.tokens.refresh.expiresIn")})

        const tokenData = await Token.findOne({id: user.userId})

        return res.json({
          access,
          refresh,
          user: {
            email: user.email
          }
        })
      } catch (error) {
        res.status(500).json({message: "Server error"})
      }
    });

module.exports = router