const User = require('../models/userSchema')
const { validateParams } = require('../Util/globalFunction')
const recruiterValidation = require('../ValidationSchema/recruiterValidation')

 // @desc Get Recruiter Data
 // @route GET /api/recruiter?id:
 // @access public

const getSingleRecruiter = async (req, res) => {

    try{
        const RecruiterId = req.query.id
    
        const response = await User.findById(RecruiterId)

        if(response){
            return res.json({ message: 'Successfully GET !!', data: response, code: 200 })
        }else{
            return res.json({ message: 'Something went wrong !!!', code: 204 })
        }
    }catch(error){
        return res.status(500).json({ message:'Internal Server Error' })
    }
    
}

// @desc Update Recruiter Details
// @route PUT /api/recruiter?id:
// @access public

const updateRecruiter = async (req, res) => {
    
    try{
        const RecruiterId = req.query.id;


        const validation = await validateParams(recruiterValidation, req?.body)

        const response = await User.findByIdAndUpdate(RecruiterId, req?.body ,{ new: true })

        if(response){
            return res.json({ message: 'Recruiter Updated !!', code : 200 })
        }
        else{
            return res.json({ message: 'Something went wrong !!!', code : 204 })
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({ message:'Internal Server Error' })
    }

}

module.exports = { getSingleRecruiter, updateRecruiter }