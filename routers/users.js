const express = require('express')
const router = express.Router()
const User = require('../models/user');


router.post('/', async (req, res) => {

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
     console.log("existinguser:",existinguser)

     if(existinguser){
        return res.status(400).json({ error: 'Username already exists' });
     }
     

      const user = new User({
        username : req.body.username,
        password : req.body.password
      }
      )
     
      await user.save()
      console.log("user:",user);
      res.status(201).json({succes:true, user})


     }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }

});

module.exports = router



