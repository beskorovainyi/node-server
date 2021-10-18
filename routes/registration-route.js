const router = require('express').Router()
const {check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const User = mongoose.model('users')

require('../models/user-model')
require('../models/token-model')

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
        const {name, email, password} = req.body
        const candidate = await User.findOne({email})
        const userId = uuidv4()

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
            .catch(error => res.json(error))
      } catch {
        res.send({message: "Server error"})
      }
    });

module.exports = router