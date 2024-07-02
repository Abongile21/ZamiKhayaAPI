const express = require("express")
const router = express.Router()

const user = require('../controllers/userController')
const auth = require('../middleware/auth.middleware')


router.get('/all', user.getAllUsers)
router.get('/user', user.getOne)
router.put('/user/:id', user.updateOne)
router.post('/faves', user.addFavorite)
router.post('/faves/:id', user.removeFavorite)

module.exports = router