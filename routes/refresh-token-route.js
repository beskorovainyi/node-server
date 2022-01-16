const router = require('express').Router()
const refreshToken = require('../controllers/refreshToken')


router.get('/refresh', refreshToken)

module.exports = router
