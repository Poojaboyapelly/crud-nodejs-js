// require('dotenv').config()
// const express = require('express');
// const router = express.Router();
// const User = require('../../models/user'); 
// const bcrypt = require('bcrypt'); 
// const jwt = require('jsonwebtoken'); 

// const posts=[
//     {
//         username:"ABC",
//         role:"Role1"
//     },{
//         username:"Jim",
//         role:"Role2"
//     }
// ]
// function authenticateToken(req,res,next){
//     const authHeader=req.headers["authorization"]
//     const token = authHeader && authHeader.split(' ')[1]
//     if(token == null) return res.sendStatus(401)

//     jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
//         if(err) return res.sendStatus(403)
//         req.user=user
//         next()
//     })
// }

// router.get('/posts',authenticateToken,(req,res)=>{
//     res.json(posts)
// })

// router.post('/signin',async (req, res) => {
//     try {
        
//         if (!req.body.username || !req.body.password) {
//             return res.status(400).json({ error: 'Username and password are required' });
//         }

//         // Find user by username
//         const user = await User.findOne({ username: req.body.username });
//         if (!user) {
//             return res.status(401).json({ error: 'Invalid username' }); 
//         }

//         // Verify password 
//         const passwordMatch = await bcrypt.compare(req.body.password, user.password);
//         if (!passwordMatch) {
//             return res.status(401).json({ error: 'Invalid password' }); 
//         }
//         if(passwordMatch)
//         console.log("password is matched")

        
//         const payload = { username: user.username, role: user.role }; 
//         const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 900 }); 
        
//         res.set({
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*'
//         });

//         res.status(200).json({
//             auth: true,
//             user: {
//                 username: user.username,
//                 role: user.role 
//             },
//             token: token
//         });
       
//     } catch (err) {
//         console.error(err);
//         if (err.name === 'JsonWebTokenError') {
//             return res.status(401).json({ error: 'Invalid or expired token' });
//         } else {
//             return res.status(500).json( err );
//         }
//     }
// });

// module.exports = router;