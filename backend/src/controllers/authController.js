const User = require('../models/userModel');
const jwtUtils = require('../utils/jwtUtils');
const emailUtils = require('../utils/emailUtils');

// Signup
async function signup(req, res) {
    const { fullname, email, password } = req.body;
    
    try {
        const user = await User.createUser(fullname, email, password);
        const token = jwtUtils.generateToken(user.id);
        res.status(201).json({ message: 'User created successfully', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

// Login
async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await User.comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwtUtils.generateToken(user.id);
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

// Forgot Password
async function forgotPassword(req, res) {
    const { email } = req.body;
    
    try {
        const user = await User.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = jwtUtils.generateResetToken(user.id);
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
        await pool.query(
            'UPDATE users SET resetToken = $1, resetTokenExpiration = $2 WHERE email = $3',
            [resetToken, user.resetTokenExpiration, email]
        );

        // Send email with the reset link
        const resetLink = `http://yourfrontend/reset-password?token=${resetToken}`;
        emailUtils.sendResetEmail(email, resetLink);

        res.status(200).json({ message: 'Password reset link sent' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

module.exports = { signup, login, forgotPassword };
