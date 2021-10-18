const jwt = require('jsonwebtoken')
const config = require('config')


const tokenService = (payload) => {

  const accessToken = jwt.sign(payload, config.get("jwt.accessSecretKey"), {expiresIn: config.get("jwt.tokens.access.expiresIn")})
  const refreshToken = jwt.sign(payload, config.get("jwt.refreshSecretKey"), {expiresIn: config.get("jwt.tokens.refresh.expiresIn")})



}

module.exports = tokenService