const mongoose = require('mongoose')

const TokenSchema = new Schema({
  refresh: String
})

module.exports = mongoose.model('token', TokenSchema)