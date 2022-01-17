const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
  userId: String,
  refreshToken: String
})

module.exports = mongoose.model('tokens', TokenSchema)
