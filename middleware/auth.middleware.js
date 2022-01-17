const tokenService = require('../services/tokenService');
const ApiError = require('../exceptions/api-error');

module.exports = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1]
    if (!accessToken) {
      return next(ApiError.UnauthorizedError())
    }

    const isValid = tokenService.validateAccessToken(accessToken)

    if (!isValid) {
      return res.status(401).json({message: "Token expired"})
    }

    return next()
  } catch (e) {
    return next(ApiError.UnauthorizedError())
  }
}
