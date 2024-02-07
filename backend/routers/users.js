require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//signup method
router.post('/signup', async (req, res) => {

  function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }

  try {



    if (!req.body.password || !containsSpecialChars(req.body.password)) {
      return res.status(400).json({ error: 'Password must contain at least 1 special character and not be empty' });
    }
    const existinguser = await User.findOne({
      username: req.body.username
    })
    console.log("existinguser:", existinguser)

    if (existinguser) {
      return res.status(400).json({ error: 'Username already exists' });
    }


    const user = new User({
      username: req.body.username,
      password: req.body.password
    }
    )

    await user.save()
    console.log("user:", user);
    res.status(201).json({ succes: true, user })


  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }

});


//signin method
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
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 600 });


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


router.get('/validateToken', async (req, res) => {
  // let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;

  try {
    // const token = req.header(Bearer);
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token)

    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return res.send("Successfully Verified");
    } else {
      // Access Denied
      return res.status(401).send(error);
    }
  } catch (error) {
    // Access Denied
    return res.status(401).send(error);
  }
})

module.exports = router



