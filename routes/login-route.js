const router = require('express').Router()
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const {asyncConfig} = require("config/async");

const User = mongoose.model('users')

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
        const access = jwt.sign({id: user.id}, config.get("jwt.accessSecretKey"), {expiresIn: config.get("jwt.tokens.access.expiresIn")})
        const refresh = jwt.sign({id: user.id}, config.get("jwt.refreshSecretKey"), {expiresIn: config.get("jwt.tokens.refresh.expiresIn")})


        return res.json({
          access,
          refresh,
          user: {
            email: user.email
          }
        })

      } catch (error) {
        res.send({message: "Server error"})
      }
    });

module.exports = router