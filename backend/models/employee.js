const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const employeeSchema = new mongoose.Schema({
    employeeId: {
        type: String, 
        required: true, 
        unique: true 
    },
    employeename: {
        type: String, 
        
    },
    dob: { 
        type: Date, 
        
    },
    department: { 
        type: String,
         
    },
    isActive: { 
        type: Boolean, 
        default: true
     },
    employmentType: { 
      type: String,
      enum: ['FullTime', 'PartTime', 'Contract'],
    },
    role:{
        type: String,
        enum: ['Admin', 'Normal', 'SuperAdmin'],
    },
    password: {
        type: String,
        required: true,
      },
    });
    
    employeeSchema.pre('save', async function (next) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
      });
      


  module.exports = mongoose.model('employee',employeeSchema)
