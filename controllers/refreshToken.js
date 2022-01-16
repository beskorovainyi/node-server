const tokenService = require('../services/tokenService')
const mongoose = require('mongoose')


const refreshToken = async (req, res) => {

  try {
    const refreshToken = req.headers.authorization.split(' ')[1]
    if (!refreshToken) {
      return res.status(401).json({message: "Error auth"})
    }

    const isAuth = tokenService.validateRefreshToken(refreshToken)
    if (!isAuth) {
      return res.status(401).json({message: "Error auth"})
    }

    const result = await tokenService.replaceDbRefreshToken(isAuth)
    return res.status(200).json(result)
  } catch (e) {
    return res.status(401).json({message: "Error auth"})
  }
}

module.exports = refreshToken
