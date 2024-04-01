const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  first_Name: {
    type: String,
    required: true
  },
  last_Name: {
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
  mobile_Number: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['candidate', 'recruiter'],
    required: true
  },

  company_Logo: {
    type: String
  },
  company_Name: {
    type: String
  },
  company_Type: {
    type: String
  },
  employees: {
    type: Number
  },
  location: {
    type: String
  },
  company_Email: {
    type: String
  },
  company_URL: {
    type: String
  },
  about_Company: {
    type: String
  }
},
{timestamps:true})

const User = mongoose.model('User', userSchema)

module.exports = User
