const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({

    sessionId: {
         type: String, 
        required: true,
         unique: true
         },
    employeeId: {
        type: String, 
        required: true,
        unique: true 
    },
    token :{
        type: String,
        
    },
    expiresAt:{
        type: Date
    }

})
module.exports = mongoose.model('session',sessionSchema)