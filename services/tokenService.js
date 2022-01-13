const jwt = require('jsonwebtoken')
const config = require('config')
const mongoose = require('mongoose')
const Token = mongoose.model("token")


const generateAccessToken = (payload) => {
  return jwt.sign(payload, config.get("jwt.accessSecretKey"), {expiresIn: config.get("jwt.tokens.access.expiresIn")})
}

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, config.get("jwt.refreshSecretKey"), {expiresIn: config.get("jwt.tokens.refresh.expiresIn")})
}

const replaceDbRefreshToken = (payload) => {

  const {userId, tokenId} = payload

  Token.findOneAndRemove({userId})
      .exec()
      .then(() => Token.create({userId, tokenId}))
}

const validateAccessToken = (token) => {
  try {
    const result = jwt.verify(token, config.get("jwt.accessSecretKey"))
    return result
  } catch (error) {
    return error
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

const updateToken = (userId) => {
  const access = generateAccessToken({id: userId})
  const refresh = generateRefreshToken()
  return replaceDbRefreshToken({userId})
}


module.exports = {
  generateRefreshToken,
  generateAccessToken,
  replaceDbRefreshToken,
  validateAccessToken,
  validateRefreshToken,
  updateToken
}
