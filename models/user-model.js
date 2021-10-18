const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  password: String
})

module.exports = mongoose.model('users', UserSchema)