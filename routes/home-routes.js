const router = require("express").Router
const axios = require("axios")

router.get('/', (req, res) => {
  res.send('home')
})

module.exports = router