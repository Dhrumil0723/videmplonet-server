const mongoose = require('mongoose')

const recordingSchema = new mongoose.Schema({
    
    candidateId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    questionId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Question'
    },

    videoLink:{
        type: String,
        required: true
    },

    recordingDate:{
        type: Date,
        required: true
    }

},{timestamps: true})

const Recording = mongoose.model('Recording', recordingSchema)

module.exports = Recording