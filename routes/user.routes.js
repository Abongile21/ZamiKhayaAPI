const express = require("express")
const router = express.Router()
const path =  require('path')
const user = require('../controllers/userController')
const auth = require('../middleware/auth.middleware')


router.get('/all', user.getAllUsers)
router.get('/user', user.getOne)
router.put('/user/:id', user.updateOne)



module.exports = router