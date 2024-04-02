const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['candidate', 'recruiter'],
    required: true
  },

  companyLogo: {
    type: String
  },
  companyName: {
    type: String
  },
  companyType: {
    type: String
  },
  employees: {
    type: Number
  },
  location: {
    type: String
  },
  companyEmail: {
    type: String
  },
  companyURL: {
    type: String
  },
  aboutCompany: {
    type: String
  }
},
{timestamps:true})

const User = mongoose.model('User', userSchema)

module.exports = User
