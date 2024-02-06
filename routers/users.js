
// router.post('/signup', async(req, res) => {

//     const { username, password } = req.body;

//     //  if  username already exists
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//         return res.status(400).json({ error: 'Username already exists' });
//     }

//     // Create a new user
//     const newUser = new User({ username, password });
//     await newUser.save();
    
    
//     res.json({ message: 'User signed up successfully' });
//   });
  
  
// router.post('/login', async (req, res) => {

//     const { username, password } = req.body;
//   // Find the user by username and password
//   const user = await User.findOne({ username, password });
//   if (user) {
//       res.json({ message: 'Login successful' });
//   } else {
//       res.status(401).json({ error: 'Invalid username or password' });
//   }
//   });
const addUser = require ('../controller/user')
const express = require('express');

const Router =express.Router();
Router.post('/',addUser);
module.exports =Router