const USER = require("../models/user.model")
const bcrypt = require("bcryptjs")
const { errorhandler } = require("../utils/error")
const Users = require("../models/user.model")
const jwt=require('jsonwebtoken')

exports.signup= async(req,res,next)=>{

   
   const {username,email,password}= req.body
   if(!username || !password || !email || username==='' || email==='' || password===''){
      next(errorhandler(400,'all field is required'))
   }
   const hashedpassword=bcrypt.hashSync(password,10)
   const User = new USER({
      username,
      email,
      password:hashedpassword
  })
     try {
     
       
        await User.save();
      res.json("signup successful")
     } catch (error) {
     next(error)
     }
}

exports.signin=async(req,res,next)=>{
   const {email,password}= req.body
   if( !password || !email || email==='' || password===''){
      next(errorhandler(400,'all field is required'))
   }
   try {
        const validUser = await Users.findOne({email})
        if(!validUser){
         return next(errorhandler(400,'user not found'))
        }
        const validPassword= bcrypt.compareSync(password,validUser.password) 
        if(!validPassword){
          return next(errorhandler(400,'Invalid password'))
        }
        const {password:pass,...rest}=validUser._doc;

        const token= jwt.sign({userID:validUser._id},process.env.JWT_SECRET)
        res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest)
   } catch (error) {
      next(error)
   }

}

exports.google=async (req,res,next)=>{
   const {username,email,photoUrl}= req.body
   try {
      const validUser = await Users.findOne({email})
      if(validUser){
      const {password:pass,...rest}=validUser._doc;

      const token= jwt.sign({userID:validUser._id},process.env.JWT_SECRET)
      res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest)
      }else{
         const generatedPassword= Math.random().toString(36).slice(-8);
         const hashedpassword=bcrypt.hashSync(generatedPassword,10)
         const User = new Users({
            username:username.split(' ').join('')+ Math.random().toString(9).slice(-4),
            email,
            password:hashedpassword,
            profilePicture:photoUrl
        })
        await User.save();

        const token= jwt.sign({userID:User._id},process.env.JWT_SECRET)
        const {password:pass,...rest}=User._doc;
        res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest)
      }
   } catch (error) {
      next(error)
   }
}