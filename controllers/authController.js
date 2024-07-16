const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Landlord = require('../models/landlordModel');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        let user;
        if (role === 'landlord') {
            user = new Landlord({
                name,
                email,
                password: hashedPassword,
                address: req.body.address,
                properties: []
            });
        } else {
            user = new User({
                name,
                email,
                password: hashedPassword,
                role: role || 'user'
            });
        }

        await user.save();

        // Generate token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }) || await Landlord.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).json({ id: user._id ,email,token,role: user.role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id) || await Landlord.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
