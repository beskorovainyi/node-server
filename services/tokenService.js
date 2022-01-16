const jwt = require('jsonwebtoken')
const config = require('config')
const mongoose = require('mongoose')
const {v4: uuidv4} = require("uuid");
const Token = mongoose.model("tokens")


const generateAccessToken = (payload) => {
  return jwt.sign(payload, config.get("jwt.accessSecretKey"), {expiresIn: config.get("jwt.tokens.access.expiresIn")})
}

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, config.get("jwt.refreshSecretKey"), {expiresIn: config.get("jwt.tokens.refresh.expiresIn")})
}

const replaceDbRefreshToken = async (payload) => {

  const userId = payload.id

  try {
    const data = await Token.findOne({userId})
    const tokenId = data.tokenId

    await Token.findOneAndRemove({tokenId: tokenId})

    const result = await updateToken(userId)
    return result
  } catch (e) {
    return e
  }
}

const validateAccessToken = (token) => {
  try {

    const result =  jwt.verify(token, config.get("jwt.accessSecretKey"))
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
    const tokenId = uuidv4()

    const token = new Token({
      userId: userId,
      tokenId: tokenId
    })

    await token.save()

    return {access, refresh}
  } catch (e) {
    return e
  }


}


module.exports = {
  generateRefreshToken,
  generateAccessToken,
  replaceDbRefreshToken,
  validateAccessToken,
  validateRefreshToken,
  updateToken
}
