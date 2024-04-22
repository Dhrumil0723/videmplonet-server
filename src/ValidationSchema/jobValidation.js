const yup = require('yup')

const jobValidation = yup.object().shape({
    jobTitle: yup.string().required(),
    salaryRange: yup.string().required(),
    country: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    jobExperience: yup.string().required(),
    jobType: yup.string().required(),
    educationStream: yup.string().required(),
    course: yup.string().required(),
    workingModel: yup.string().required(),
    jobDescription: yup.string().required(),
    jobStatus: yup.string().required(),
    jobDate: yup.date().required(),
})



module.exports = { jobValidation }