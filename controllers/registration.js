const mongoose = require('mongoose');
const {v4: uuidv4} = require("uuid");
const bcrypt = require("bcryptjs");
const {error} = require("winston");
const {check, validationResult} = require("express-validator");
const User = mongoose.model('users');

const registration = async (req, res) => {

  if (!validationResult(req).isEmpty()) {
    return res.status(404).json({message: "Incorrect password or email"})
  }

  const {name, email, password} = req.body
  const userId = uuidv4()

  try {
    const candidate = await User.findOne({email})
    if (candidate) {
      return res.status(400).json({message: `User with email ${email} already exist`})
    }

    const hashPassword = await bcrypt.hash(password, 8)
    const user = new User({
      userId: userId,
      name: name,
      email: email,
      password: hashPassword
    })
    user.save()
        .then(result => res.json({message: "User was created"}))
        .catch(error => res.json({message: "Error"}))
  } catch (err) {
    return res.status(500).json({message: "Error server"})
  }
}

module.exports = registration
