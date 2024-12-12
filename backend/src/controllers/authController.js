const User = require('../models/userModel');
const jwtUtils = require('../utils/jwtUtils');
const emailUtils = require('../utils/emailUtils');

// Signup
async function signup(req, res) {
    const { fullname, email, password } = req.body;
    console.log(`Signup request received for email: ${email}`);
    
    try {
        const user = await User.createUser(fullname, email, password);
        const token = jwtUtils.generateToken(user.id);
        console.log(`User created successfully: ${email}`);
        res.status(201).json({ message: 'User created successfully', token });
    } catch (err) {
        console.error(`Error during signup for email: ${email}`, err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

// Login
async function login(req, res) {
    const { email, password } = req.body;
    console.log(`Login request received for email: ${email}`);

    try {
        const user = await User.getUserByEmail(email);
        if (!user) {
            console.log(`User not found: ${email}`);
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await User.comparePassword(password, user.password);
        if (!isMatch) {
            console.log(`Invalid credentials for email: ${email}`);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwtUtils.generateToken(user.id);
        console.log(`Login successful for email: ${email}`);
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error(`Error during login for email: ${email}`, err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

// Forgot Password
async function forgotPassword(req, res) {
    const { email } = req.body;
    console.log(`Forgot password request received for email: ${email}`);
    
    try {
        const user = await User.getUserByEmail(email);
        if (!user) {
            console.log(`User not found: ${email}`);
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

        console.log(`Password reset link sent to email: ${email}`);
        res.status(200).json({ message: 'Password reset link sent' });
    } catch (err) {
        console.error(`Error during forgot password for email: ${email}`, err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

module.exports = { signup, login, forgotPassword };
