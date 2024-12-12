const bcrypt = require('bcryptjs');
const pool = require('../config');

const User = {
    async createUser(fullname, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *',
            [fullname, email, hashedPassword]
        );
        return result.rows[0];
    },

    async getUserByEmail(email) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    },

    async comparePassword(enteredPassword, storedPassword) {
        return bcrypt.compare(enteredPassword, storedPassword);
    },
};

module.exports = User;
