const axios = require("axios");
const router = require('express').Router();
const logger = require('../config/logger')
const {format} = require("winston");
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')

require('../modules/User')

const User = mongoose.model('users')

//login user
router.get('/login', (req, res) => {
  const user = new User({
    email: "m",
    password: 1111
  })
  user.save()
      .then(res => console.log(res))
      .catch(err => console.log(err))
  res.send('login');
});

// registration user
router.post('/registration', [
      check('email', 'Uncorrect email').isEmail(),
      check('password', 'Uncorrect password').isLength({min: 3, max: 12})
    ],
    async (req, res) => {

      try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(400).json({messages: "Uncorrect request", errors})
        }

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
        // console.log()
        res.send({message: "Server error"})
      }
    });

module.exports = router;