const User = require('../models/userSchema')
const { hashPassword, comparePassword } = require('../helpers/auth')
const generateToken = require('../Util/generateToken')


// @desc User SIGNUP
// @route POST /api/user/signup
// @access public
const signUp = async (req, res) => {
    
    try {
      const { firstName, lastName, email, password, mobileNumber, gender, role, companyName, companyURL } = req.body;

      const hashedPassword = await hashPassword(password);

      const userData = {
        firstName,
        lastName, 
        email,
        password:  hashedPassword,
        mobileNumber,
        gender,
        role
      }

      if (role === 'recruiter') {
        userData.companyName = companyName
        userData.companyURL = companyURL
      }

      const isAlreadyExits = await User.findOne({ email });

      if(isAlreadyExits){
        return res.json({ message: 'Email already exists', code: 400 })
      }

      const response = await User.create(userData);

      if(response){
        return res.json({ message: 'SignUp Successfully !!' , code: 200 });
      }else{
        return res.json({ message: 'Something Went Wrong !', code: 400 });
      }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
     }
  }

  // @desc Authenticate a user
  // @route POST /api/user/login
  // @access public
  const login = async (req, res) => {

    try {
      const { email, password } = req.body;
    
      const isEmail = await User.findOne({ email })
      if (!isEmail) {
        return res.status(200).json({ message: 'Email is not exits !!'});
      }

      const isPasswordMatch = await comparePassword(password, isEmail.password);

      if (!isPasswordMatch) {
        return res.json({ message: 'Invalid password' , code: 401 });
      }else{
        const token = generateToken(isEmail._id);
        if(token){
          return res.json({ message: 'Login Successfully', data:{ isEmail, token }, code: 200 });
        }else{
          return res.json({ message: 'Something Went Wrong !', code: 400 });
        }
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    
  }

  // @desc Authenticate a admin user
  // @route POST /api/user/admin/login
  // @access public
  const adminLogin = async (req, res) => {

    try {
      const { email, password } = req.body;
    
      const isEmail = await User.findOne({ email })
      if (!isEmail) {
        return res.status(200).json({ message: 'Email is not exits !!'});
      }

      const isPasswordMatch = password === isEmail.password ? true : false;

      if (!isPasswordMatch) {
        return res.json({ message: 'Invalid password' , code: 401 });
      }else{
        const token = generateToken(isEmail._id);
        if(token){
          return res.json({ message: 'Login Successfully', data:{ isEmail, token }, code: 200 });
        }else{
          return res.json({ message: 'Something Went Wrong !', code: 400 });
        }
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    
  }

  module.exports = { signUp, login, adminLogin };