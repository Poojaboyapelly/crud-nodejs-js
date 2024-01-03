const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    employeeId: {
        type: String, 
        required: true, 
        unique: true 
    },
    name: {
        type: String, 
        required: true 
    },
    DOB: { 
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
      enum: ['Fulltime', 'Parttime', 'Contract'],
    },
  });

  module.exports = mongoose.model('employee',employeeSchema)
