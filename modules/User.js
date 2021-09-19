const mongoose = require('mongoose');

const PostShema =  mongoose.Schema({
  name: String,
  email: String,
  password: String
})

module.exports = mongoose.model('user', PostShema)