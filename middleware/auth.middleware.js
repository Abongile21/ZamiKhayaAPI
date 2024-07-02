const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied. No Token Provided.' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (user && user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Access Denied. Admins Only.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const isLandlordOrAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (user && (user.role === 'admin' || user.role === 'landlord')) {
            next();
        } else {
            res.status(403).json({ message: 'Access Denied. Landlords or Admins Only.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    verifyToken,
    isAdmin,
    isLandlordOrAdmin
};
