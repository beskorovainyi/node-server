const jwt = require('jsonwebtoken')
const config = require('config')
const mongoose = require('mongoose')
const Token = mongoose.model("tokens")


const generateAccessToken = (payload) => {
  return jwt.sign(payload, config.get("jwt.accessSecretKey"), {expiresIn: config.get("jwt.tokens.access.expiresIn")})
}

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, config.get("jwt.refreshSecretKey"), {expiresIn: config.get("jwt.tokens.refresh.expiresIn")})
}

const replaceDbRefreshToken = async (payload) => {

  const userId = payload

  try {
    const data = await Token.findOne({userId})
    const refresh = data.refreshToken

    await Token.findOneAndRemove({refreshToken: refresh})

    const result = await updateToken(userId)
    return result
  } catch (e) {
    return null
  }
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

const updateToken = async (payload) => {
  const userId = payload

  try {
    const access = generateAccessToken({id: userId})
    const refresh = generateRefreshToken({id: userId})

    const token = new Token({
      userId: userId,
      refreshToken: refresh
    })

    await token.save()

    return {access, refresh}
  } catch (e) {
    return e
  }
}

const findRefreshToken = async (payload) => {
  try {
    const token = await Token.findOne({refreshToken: payload})
    return token
  } catch (e) {
    return null
  }
}


module.exports = {
  generateRefreshToken,
  generateAccessToken,
  replaceDbRefreshToken,
  validateAccessToken,
  validateRefreshToken,
  updateToken,
  findRefreshToken
}
