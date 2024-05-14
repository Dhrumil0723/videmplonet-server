const User = require('../models/userSchema')
const { validateParams } = require('../Util/globalFunction')
const CandidateValidation = require('../ValidationSchema/candidateValidation')

 // @desc Get Candidate Data
 // @route GET /api/Candidate?id:
 // @access public

const getSingleCandidate = async (req, res) => {

    try{
        const CandidateId = req.query.id
    
        const response = await User.findById(CandidateId)

        if(response){
            return res.json({ message: 'Successfully GET !!', data: response, code: 200 })
        }else{
            return res.json({ message: 'Something went wrong !!!', code: 204 })
        }
    }catch(error){
        return res.status(500).json({ message:'Internal Server Error' })
    }
    
}

// @desc Get All Candidate Data
// @route GET /api/Candidate
// @access public

const getAllCandidate = async (req, res) => {

    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const search = req.query.search || '';
        const status = req.query.userStatus || '';


        let query = {
            role: 'candidate',
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

// @desc Update Candidate Details
// @route PUT /api/Candidate?id:
// @access public

const updateCandidate = async (req, res) => {
    
    try{
        const CandidateId = req.query.id;


        const validation = await validateParams(CandidateValidation, req?.body)

        const response = await User.findByIdAndUpdate(CandidateId, req?.body ,{ new: true })

        if(response){
            return res.json({ message: 'Candidate Updated !!', code : 200 })
        }
        else{
            return res.json({ message: 'Something went wrong !!!', code : 204 })
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({ message:'Internal Server Error' })
    }

}

module.exports = { getSingleCandidate, updateCandidate, getAllCandidate }