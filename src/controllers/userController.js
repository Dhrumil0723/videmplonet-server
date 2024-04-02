const User = require('../models/userSchema')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')
const generateToken = require('../Util/generateToken')

const signup = async (req, res) => {
    
    try {
      const { firstName, lastName, email, password, mobileNumber, role, companyName, companyURL } = req.body

      const  hashedPassword = await hashPassword(password)

      const userData = {
        firstName,
        lastName, 
        email,
        password:  hashedPassword,
        mobileNumber,
        role
      }

      if (role === 'recruiter') {
        userData.company_Name = companyName
        userData.company_URL = companyURL
      }


      const isAlreadyExits = await User.findOne({ email })
      if(isAlreadyExits){
        return res.status(200).json({ message: 'Email already exists', code: 204 })
      }

      //map data
      const response = await User.create(userData);
      const token = await jwt.sign({email: response.email, id: response._id, role: response.role}, process.env.JWT_SECRET)
      if(token){
        return res.cookie(token).status(200).json({ message: 'Successfully !! User Signup', code: 200 });
      }else{
        return res.status(200).json({ message: 'Something is wrong !!', code: 204 });
      }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
     }
  }


  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(200).json({ message: 'Invalid email' ,code:204});
      }
  
      // const accessToken = jwt.sign({ email: user.email, id: user._id}, process.env.ACCESS_TOKEN_SECRET)
      // res.json({ accessToken })

      const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
      // const jwt = 

      const passwordMatch = await comparePassword(password, user.password)

      if(passwordMatch){
        // const accessToken = jwt.sign({email: user.email, id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'})
        // const refreshToken = jwt.sign({email: user.email, id: user._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'})
        jwt.sign({email: user.email, id: user._id, role: user.role}, process.env.JWT_SECRET, {}, (err, token) => {
          if(err) throw err;
          return res.json({ message: 'Login Successfully',code:200, data:{user, token} })
        } )
        // return res.status(200).json({ Token: generateToken(user.id), message: 'Login Successfully', code: 200})
      }

      if (!passwordMatch) {
        return res.status(200).json({ message: 'Invalid password',code:204 });
      }
  
      // return res.status(200).json({ message: 'Login Successfully',code:200 });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

module.exports = { signup, login };