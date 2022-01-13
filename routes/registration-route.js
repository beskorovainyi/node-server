const router = require('express').Router();
const {check, validationResult} = require("express-validator");
const registration = require('../controllers/registration');


router.post('/registration',
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'Uncorrect password').isLength({min: 3, max: 12}), registration)


module.exports = router
