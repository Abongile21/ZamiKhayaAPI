const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth.middleware');


router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', verifyToken, authController.getUserProfile);

module.exports = router;
