const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const saltRounds = 10; // Number of salt rounds for hashing
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

module.exports = {
    hashPassword
};
