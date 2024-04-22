const yup = require('yup')

const questionValidation = yup.object().shape({
    question: yup.string().required(),
    time: yup.string().required(),
    retake: yup.string().required()
})

module.exports = questionValidation