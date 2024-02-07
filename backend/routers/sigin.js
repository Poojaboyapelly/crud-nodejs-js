const express = require('express');
const router = express.Router();
const User = require('../../models/user'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

router.post('/signin', async (req, res) => {
    try {
        
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Find user by username
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username' }); 
        }

        // Verify password 
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' }); 
        }

        
        const payload = { username: user.username, role: user.role }; 
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 900 }); 

        
        res.status(200).json({
            auth: true,
            user: {
                username: user.username,
                role: user.role 
            },
            token: token
        });
    } catch (err) {
        console.error(err);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid or expired token' });
        } else {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
});

module.exports = router;
