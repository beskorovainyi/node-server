const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
  userId: String,
  tokenId: String
})

module.exports = mongoose.model('token', TokenSchema)
