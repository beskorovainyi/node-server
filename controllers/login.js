const mongoose = require('mongoose');
const User = mongoose.model('users');
const Token = mongoose.model('tokens');
const tokenService = require('../services/tokenService');
const bcrypt = require('bcryptjs');
const {error} = require("winston");
const {v4: uuidv4} = require("uuid");
const {use} = require("express/lib/router");


const login = async (req, res) => {

  const {email, password} = req.body
  try {

    const user = await User.findOne({email})
    if (user === null) {
      return res.status(404).json({message: "User not found"})
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({massage: "Invalid password"})
    }
    //
    // const isToken = await Token.findOne({userId: user.userId})
    // if (user.userId === isToken.userId) {
    //
    //
    //   tokenService.replaceDbRefreshToken(user.userId)
    //   return res.status(200).json(isToken.tokenId)
    // }

    const access = tokenService.generateAccessToken({id: user.userId})
    const refresh = tokenService.generateRefreshToken({id: user.userId})

    const tokenId = uuidv4()

    const token = new Token({
      userId: user.userId,
      tokenId: tokenId
    })

    token.save()
        .then()
        .catch()

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
