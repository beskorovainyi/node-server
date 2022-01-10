const tokenService = require('../services/tokenService')


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!tokenService.validateAccessToken(token)) {
      return res.status(404).json({message: "Token error"})
    }
    next()
  } catch (e) {
    return res.status(401).json({message: "Auth error"})
  }
}
