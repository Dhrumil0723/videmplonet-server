const yup = require('yup')

const userValidation = yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    mobileNumber: yup.string().required('Mobile Number is required'),
    userStatus: yup.string().required('User Status is required')
  })

module.exports = userValidation