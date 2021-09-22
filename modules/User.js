const mongoose = require('mongoose');

const PostShema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: String,
  password: String
})

module.exports = mongoose.model('users', PostShema)