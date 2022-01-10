const router = require('express').Router();
const auth = require('../controllers/auth');
const authMiddleware = require('../middleware/auth.middleware');


router.get('/auth', authMiddleware,  auth);

module.exports = router;
