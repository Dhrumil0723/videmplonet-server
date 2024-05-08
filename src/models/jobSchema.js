const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    recruiterId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    jobTitle:{
        type: String,
        required: true
    },

    salaryRange:{
        type: String,
        required: true
    },

    country:{
        type: String,
        required: true
    },
    
    state:{
        type: String,
        required: true
    },

    city:{
        type: String,
        required: true
    },

    jobExperience:{
        type: String,
        required: true
    },

    jobType:{
        type: String,
        required: true
    },

    educationStream:{
        type: String,
        required: true
    },

    course:{
        type: String,
        required: true
    },

    workingMode:{
        type: String,
        required: true
    },

    jobDescription:{
        type: String,
        required: true
    },

    jobStatus:{
        type: String,
        enum:['Active', 'Inactive']
    },

    jobDate:{
        type: Date
    }
},
{timestamps:true})

const Job = mongoose.model('Job', jobSchema)

module.exports = Job