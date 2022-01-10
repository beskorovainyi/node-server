const jwt = require('jsonwebtoken')
const config = require('config')
const mongoose = require('mongoose')
const Token = mongoose.model("token")
const User = mongoose.model('users')


const generateAccessToken = (payload) => {
  return jwt.sign(payload, config.get("jwt.accessSecretKey"), {expiresIn: config.get("jwt.tokens.access.expiresIn")})
}

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, config.get("jwt.refreshSecretKey"), {expiresIn: config.get("jwt.tokens.refresh.expiresIn")})
}

const replaceDbRefreshToken = (payload) => {

  Token.findOneAndRemove({payload})
      .exec()
      .then(result => console.log(result))
}

const validateAccessToken = (token) => {
  try {
    const result = jwt.verify(token, config.get("jwt.accessSecretKey"))
    return result
  } catch (e) {
    return null
  }
}

const validateRefreshToken = (token) => {
  try {
    const result = jwt.verify(token, config.get("jwt.refreshSecretKey"))
    return result
  } catch (e) {
    return null
  }
}

module.exports = {
  generateRefreshToken,
  generateAccessToken,
  replaceDbRefreshToken,
  validateAccessToken,
  validateRefreshToken
}
