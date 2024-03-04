import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';


export const signup = async (req,res,next)=>{
    const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password:hashedPassword   
    })
    try {
        await newUser.save();
        res.status(200).json({"message":"User created successfully!"})
        
    } catch (error) {
        next(errorHandler(500,error.message))
        
    }



}

export const signin=async(req,res,next)=>{
    const SECRET_KEY="HAPPYDAPPY"
 const {email,password} = req.body;
 try {
     const validUser = await User.findOne({email})
     if(!validUser){
            return next(errorHandler(404,"Invalid email"))
     }
     const validPassword = bcryptjs.compareSync(password,validUser.password)
     if(!validPassword){
        return next(errorHandler(404,"Invalid email or password"))
     }
     const token = jwt.sign({_id:validUser._id},SECRET_KEY)
      const {password:passw, ...rest} =validUser._doc
     res
     .cookie('access_token', token, { httpOnly: true })
     .status(200)
     .json(rest);
    
 } catch (error) {
    next(errorHandler(500,error.message))
 }
}


export const google=async(req,res,next)=>{
    const SECRET_KEY="HAPPYDAPPY"
try {
    
    const user = await User.findOne({email:req.body.email})
    if(user){
        const token = jwt.sign({_id:user._id},SECRET_KEY)
        const {password:passw, ...rest} =user._doc
        res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
    else {
        const generatedPassw= Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
        
        const hashedPassword= bcryptjs.hashSync(generatedPassw, 10);    

        const newUser = new User({
            username:req.body.name+Math.random().toString(36).slice(-4),
            email:req.body.email,
            password:hashedPassword,
            avatar:req.body.photo
        })
        await newUser.save();
        const token = jwt.sign({_id:newUser._id},SECRET_KEY)
        const {password:passw, ...rest} =newUser._doc
        res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);

    }
    
} catch (error) {
    next(errorHandler(500,error.message))
}
}
export const signOut = async (req, res, next) => {
    try {
      res.clearCookie('access_token');
      res.status(200).json('User has been logged out!');
    } catch (error) {
      next(error);
    }
  };