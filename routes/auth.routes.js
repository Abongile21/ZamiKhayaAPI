const express = require("express")
const router = express.Router()
const user = require('../controllers/authController')
const auth = require('../middleware/auth.middleware')


router.post('/register',user.signup)
router.post('/signin', auth.verifyToken, user.login)


module.exports = router