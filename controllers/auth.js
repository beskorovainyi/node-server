require('../models/user-model')
require('../models/token-model')

const auth = (req, res) => {
  res.status(200).json({data: "success"})
}

module.exports = auth
