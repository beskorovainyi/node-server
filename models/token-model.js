const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
  userId: String,
  refresh: String
})

module.exports = mongoose.model('token', TokenSchema)
