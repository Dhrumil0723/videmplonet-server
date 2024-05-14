const User = require('../models/userSchema')
const { validateParams } = require('../Util/globalFunction')
const userValidation = require('../ValidationSchema/userValidations')


// @desc Admin Change Password
// @route POST /api/admin/change-password
// @access public

const changePassword = async (req, res) => {
    
    try {
        const userId = req.query.id;
        const { currentPassword, newPassword } = req.body;
      const userData = await User.findById(userId);
      if(userData?.password !== currentPassword){
        return res.json({ message: 'Incorrect Password exists', code: 400 })
      }
      const response = await User.findByIdAndUpdate(userData,{ password: newPassword}, { new: true });
      if(response){
        return res.json({ message: 'Password Updates Successfully !!' , code: 200 });
      }else{
        return res.json({ message: 'Something Went Wrong !', code: 400 });
      }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
     }
  }

// @desc User Delete
// @route DELETE /api/admin/user
// @access public

const deleteUser = async(req, res) => {
    try {
        const userId = req.query.id;

        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found', code: 404 });
        }

        const response = await User.deleteOne({ _id: userId });

        if (response) {
            return res.json({ message: 'User Deleted !!', code: 200 });
        } else {
            return res.json({ message: 'Something went wrong !!!', code: 204 });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
}

// @desc UPDATE user
// @route PUT /api/admin/user
// @access public

const updateUser = async (req, res) => {
    try{
        const UserId = req.query.id;


        const validation = await validateParams(userValidation, req?.body)

        const response = await User.findByIdAndUpdate(UserId, req?.body ,{ new: true })

        if(response){
            return res.json({ message: 'User Updated !!', code : 200 })
        }
        else{
            return res.json({ message: 'Something went wrong !!!', code : 204 })
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({ message:'Internal Server Error' })
    }
}


  module.exports = { changePassword, deleteUser, updateUser };