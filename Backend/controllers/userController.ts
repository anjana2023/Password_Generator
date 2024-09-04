import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/customError";
import bcrypt from "bcrypt";
import User from "../models/user";
import Password from "../models/password";
import generateTokens from "../utils/generateToken";


export const registerUser = async(
  req: Request,
  res: Response,
  next: NextFunction
) =>{
 try {
    const { email } = req.body;
    const {username,password} = req.body
    
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      throw new CustomError("Email already exists", 401);
    }
    await User.create({name:username,
        email:email,
        password:password
    });
    return res
      .status(200)
      .json({ success: true, message: "User registration success" });
 } catch (error) {
    next(error)
 }
}


export const loginUser = async(
    req: Request,
    res: Response,
    next: NextFunction
  ) =>{
   try {
    const {email,password} = req.body;

    const isEmailExist = await User.findOne({ email });
    if (!isEmailExist) {
        throw new CustomError("Invalid credentials", 401);
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      isEmailExist.password
    );
    if (!isPasswordMatch) throw new CustomError("Invalid credentials", 401);
    const payload = {
      id: isEmailExist._id,
      name: isEmailExist.name,
      email: isEmailExist.email,
    };
    const { access_token } = generateTokens(payload);
    

    return res.status(200).json({
      success: true,
      message: "User LoggedIn successfully",
      access_token,
    });
   } catch (error) {
      next(error)
   }
  }

  export const savePassword = async(
    req: Request,
    res: Response,
    next: NextFunction
  ) =>{
   try {
    const {passwordName,id,password} = req.body;

    if(!id){
      return res
    .status(404)
    .json({ success: false, message: "Not authenticated" });
    }

    await Password.create({user:id,
      name:passwordName,
      password:password
    });
    return res
    .status(200)
    .json({ success: true, message: "Password Saved" });
   } catch (error) {
      next(error)
   }
  }


  export const getPassword = async(
    req: Request,
    res: Response,
    next: NextFunction
  ) =>{
   try {
    const { userId } = req.query;  // Extract userId from the query parameters
    const passwords = await Password.find({ user:userId });
    return res
    .status(200)
    .json({ success: true,passwords:passwords });
   } catch (error) {
      next(error)
   }
  }

  export const editPassword = async(
    req: Request,
    res: Response,
    next: NextFunction
  ) =>{
   try {
   
   const {name,password,userId} = req.body
   
   if (!name.trim() || !password.trim()) {
    return res.status(400).json({ success: false, message: 'Name and password cannot be empty or just whitespace' });
  }

   const updatedPassword = await Password.findOneAndUpdate(
    { user: userId }, 
    { name: name, password: password }, 
    { new: true } 
  ); 
    return res
    .status(200)
    .json({ success: true});
   } catch (error) {
      next(error)
   }
  }

  export const deletePassword = async(
    req: Request,
    res: Response,
    next: NextFunction
  ) =>{
   try {
   
   const {id} = req.params;
    const deletePassword = await Password.findByIdAndDelete({_id:id});
    return res
    .status(200)
    .json({ success: true});
   } catch (error) {
      next(error)
   }
  }