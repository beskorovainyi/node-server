const tokenService = require('../services/tokenService')


const refreshToken = async (req, res) => {

  try {
    const refreshToken = req.headers.authorization.split(' ')[1]
    if (!refreshToken) {
      return res.status(401).json({message: "Error auth"})
    }

    const tokenFromDb = await tokenService.findRefreshToken(refreshToken)
    const isAuth = tokenService.validateRefreshToken(refreshToken)

    if (!isAuth || !tokenFromDb) {
      return res.status(401).json({message: "Error auth"})
    }

    const userId = isAuth.id
    const result = await tokenService.replaceDbRefreshToken(userId)

    if (!result) {
      return res.status(401).json({message: "Error auth"})
    }

    return res.status(200).json(result)
  } catch (e) {
    return res.status(401).json({message: "Error auth"})
  }
}

module.exports = refreshToken
