const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    jobId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Job'
    },
    question:{
        type: String,
        required: true
    },
    questionTime:{
        type: String,
        required: true
    },
    questionRetake:{
        type: Boolean,
        required: true
    }
}, {timestamps: true})


module.exports = mongoose.models.Question || mongoose.model('Question', questionSchema);