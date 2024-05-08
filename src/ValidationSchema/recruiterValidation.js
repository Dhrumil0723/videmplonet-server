const yup = require('yup')

const recruiterValidation = yup.object({
    companyLogo: yup.string().required(),
    companyName: yup.string().required('Company Name is required'),
    typeOfCompany: yup.string().required('Type Of Company is required'),
    companyEmployees: yup.string().required('Employees is required'),
    companyLocation: yup.string().required('Location is required'),
    companyEmail: yup.string()
      .email('Invalid Email')
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        'Enter correct Email'
      )
      .required('Company Email is required'),
    companyURL: yup.string().required('Company Url is required'),
    aboutCompany: yup.string().required('About Company Url is required')
  })

module.exports = recruiterValidation