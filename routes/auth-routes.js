const axios = require("axios");
const router = require('express').Router();
const logger = require('../config/logger')
const {format} = require("winston");
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

require('../modules/User')

const User = mongoose.model('users')

//auth login
router.get('/login', (req, res) => {
  const user = new User({
    name: "Max",
    email: "max@email",
    password: 1111
  })
  user.save()
      .then(res => console.log(res))
      .catch(err => console.log(err))
  res.send('login');
});

// auth with logout
router.post('/registration', async (req, res) => {

  try {
    const {email, password} = req.body
    const candidate = User.findOne({email})

    if (candidate) {
     return res.status(400).json({message: `User with email ${email} already exist`})
    }
    const hashPassword = await bcrypt.hash(password, 15)

    const user = new User({
      email: email,
      password: hashPassword
    })
     user.save()
        .then(result => res.json({message: "User was created"}))
        .catch(error => res.json(error))
  } catch {
    console.log(e)
    res.send({message: "Server error"})
  }
});


// auth with google
// router.get('/google', passport.authenticate('google', {
//   scope:['profile']
// }));

//callback router for google to redirect to
// router.get('/google/redirect', passport.authenticate('google'),(req, res) => {
//   res.send('You reached the callback URL')
// });


module.exports = router;