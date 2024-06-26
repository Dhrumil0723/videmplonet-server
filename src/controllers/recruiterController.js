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

// @desc Get All Recruiter Data
// @route GET /api/recruiter
// @access public

const getAllRecruiter = async (req, res) => {

    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const search = req.query.search || '';
        const status = req.query.userStatus || '';


        let query = {
            role: 'recruiter',
            $or: [
                { firstName: { $regex: search, $options: "i" } },            
                { lastName: { $regex: search, $options: "i"} },
                { email: { $regex: search, $options: "i" } }       
            ]
        }

        if (status) {
            query={...query, userStatus: status}
        }
        

        const skip = (page - 1) * limit;

        const totalUsers = await User.countDocuments({ ...query });
        const totalPages = Math.ceil(totalUsers / limit);

        const user = await User.find({ ...query })
                            .sort({ createdAt: -1 })
                            .skip(skip)
                            .limit(limit);

        return res.json({
            message: 'Successfully GET !!',
            data: user,
            pagination: {
                totalPages,
                currentPage: page,
                totalUsers
            },
            code: 200
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
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

module.exports = { getSingleRecruiter, updateRecruiter, getAllRecruiter }