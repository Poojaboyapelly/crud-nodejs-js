const express = require('express')
const router = express.Router()
const User = require('../models/user');


router.post('/', async (req, res) => {

    try {
    
      const user = new User({
        username : req.body.username,
        password : req.body.password
      }
      )
      console.log(user);
      await user.save()
      res.status(201).json({succes:true, user})


    }
    catch (err) {
        res.send('Error' + err)
    }

});


module.exports = router