const tokenService = require('../services/tokenService');
const ApiError = require('../exceptions/api-error')
const jwt = require('jsonwebtoken');
const {instance} = require("schema/lib/validation");


module.exports = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1]
    if (!accessToken) {
      return next(ApiError.UnauthorizedError())
    }

    const isValid = tokenService.validateAccessToken(accessToken)

    if (isValid instanceof jwt.TokenExpiredError) {
      return next(ApiError.UnauthorizedError())
    }
    return next()
  } catch (e) {
    return next(ApiError.UnauthorizedError())
  }
}
