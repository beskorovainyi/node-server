const router = require('express').Router()
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

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
        const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
        return res.json({
          token,
          user: {
            email: user.email
          }
        })
      } catch (error) {
        res.send({message: "Server error"})
      }
    });

module.exports = router