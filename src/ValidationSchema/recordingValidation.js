const yup = require('yup')

const recordingValidation = yup.object().shape({
    candidateId: yup.string().required(),
    questionId: yup.string().required(),
    videoLink: yup.string().required(),
    recordingDate: yup.string().required()
})

module.exports = recordingValidation