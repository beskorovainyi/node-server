const router = require('express').Router();
const logger = require('../config/logger')
const {format} = require("winston");
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const authMiddleware = require('../middleware/auth.middleware')

require('../models/user-model')
const User = mongoose.model('users')

router.get('/auth', authMiddleware,

    async (req, res) => {
      try {
        const user = await User.findOne({_id: req.user.id})
        console.log(user)
        const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: "1h"})
        return res.json({message: "ok"})
      } catch (error) {
        res.send({message: "Server error"})
      }

    })

module.exports = router;