const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    employeeId: {
        type: String, 
        required: true, 
        unique: true 
    },
    token :{
        type: String,
        unique:true,
    }

})
module.exports = mongoose.model('session',sessionSchema)