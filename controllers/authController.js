const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
// Controller for Signup
exports.signup = async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        // Validate input fields
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        await User.create({ name, email, phone, password: hashedPassword });

        // Send success response
        res.status(201).json({ success: true, message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ success: false, message: 'An error occurred. Please try again later.' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // Create JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return success response with token
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
