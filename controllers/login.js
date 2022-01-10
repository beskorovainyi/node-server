const mongoose = require('mongoose')
const User = mongoose.model('users')
const Token = mongoose.model('token')
const tokenService = require('../services/tokenService');
const bcrypt = require('bcryptjs');
const {error} = require("winston");


const login = async (req, res) => {

  const {email, password} = req.body

  try {

    const user = await User.findOne({email})
    if (user === null) {
      return res.status(404).json({message: "User not found"})
    }

    const isPassValid = bcrypt.compareSync(password, user.password)
    if (!isPassValid) {
      return res.status(400).json({massage: "Invalid password"})
    }

    const access = tokenService.generateAccessToken({id: user.userId})
    const refresh = tokenService.generateRefreshToken({id: user.userId})

    new Token({
      userId: user.userId,
      refresh: refresh
    })

    return res.json({
      access,
      refresh,
      user: {
        email: user.email
      }
    })
  } catch (e) {
    return res.status(500).json({message: "Server error"})
  }
}

module.exports = login
