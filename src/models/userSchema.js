const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    // required: true
  },
  
  lastName: {
    type: String,
    // required: true
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

  gender: {
    type: String,
    enum: ['male', 'female', 'others'],
    // required: true
  },

  mobileNumber: {
    type: String,
    // required: true
  },

  role: {
    type: String,
    enum: ['candidate', 'recruiter', 'admin'],
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

  companyEmployees: {
    type: Number
  },

  companyLocation: {
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
  },

  candidateEducation:{
    type: String
  },

  candidateCourse:{
    type: String
  },

  candidateExperience:{
    type: String
  },

  candidateSkills:{
    type: String
  },

  userStatus:{
    type: String,
    enum: ['active', 'Inactive']
  }

},
{timestamps:true})

// userSchema.virtual('tasks', {
//   ref: 'Task',
//   localField: '_id',
//   foreignField: 'owner'
// })

const User = mongoose.model('User', userSchema)

module.exports = User
