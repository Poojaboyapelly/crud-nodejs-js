const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    employeeId: {
        type: String, 
        required: true, 
        unique: true 
    },
    employeename: {
        type: String, 
        required: true 
    },
    dob: { 
        type: Date, 
        required: true 
    },
    department: { 
        type: String,
        required: true 
    },
    isActive: { 
        type: Boolean, 
        default: true
     },
    employmentType: { 
      type: String,
      enum: ['FullTime', 'PartTime', 'Contract'],
    },
  });

  module.exports = mongoose.model('employee',employeeSchema)
