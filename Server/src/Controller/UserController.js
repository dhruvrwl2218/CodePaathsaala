 import { Error } from 'mongoose';
 import {User} from '../Models/UserModel.js';
 import { ApiError } from '../Utils/Errors.js';
 import { ApiResponse } from '../Utils/ApiResponse.js'; 
import nodemailer from 'nodemailer'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

 const GenerateAccessAndRefreshToken = async(user) =>{

    const accessToken = await user.GenerateAccessToken();
    const refreshToken = await user.GenerateRefreshToken();

   try {
      user.refreshToken = refreshToken;
      user.save({validateBeforeSave : false})
   } catch (error) {
      error
   }

    return({accessToken,refreshToken})
 }


 export const UserSignIn = async (req,res) =>{

   const {FullName, Email, Password} = req.body;

   let {Role} = req.params;

   // console.log(params);


   console.log(`${FullName},${Email},${Password}`)

   if([FullName,Email,Password].some((e)=> e?.trim() === "")){
      // throw new ApiError("All the credentails are needed",Error)
     return res.status(500)
     .json(new ApiResponse(500,"All fields are required!"))
   }

   function isValidEmail(email) {
      // Regular expression for basic email validation
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ ;
      return emailRegex.test(email);
   }

   if(!isValidEmail(Email)){
   //   throw new ApiError("email is not valid",Error)
   //  return new ApiResponse(500,"Email is not valid")
   return res.status(409).json( new ApiResponse(409,"Email is not valid"))
   }

   const UserCheck = await User.findOne({Email}) 

   if(UserCheck){
      // res.send("User already exits")
      // throw new ApiError(409, "User with email or username already exists");
   //   return new ApiResponse(409,"user Already exites");
   return res.status(409)
   .json(new ApiResponse(409,"user Already exits"))
   
   }
   console.log(Email)
   
   Role = process.env.EMAIL === Email ? "Admin" : Role ; 

   const user = await User.create({FullName : FullName, Email : Email, Password: Password, Role : Role})

   const ConfirmUser = User.findById(user.id);
   
   if(!ConfirmUser){
      new ApiResponse(500,"Somethings went wrong while Signing In")
   }

   res.json(
      new ApiResponse(200,user,"user Regestired successfullly!")
   )
}
export const UserLogIn = async (req,res) =>{

// check fileds are not empty then 
// next is email or username is present in the db 
// password match 
// generate the access and refresh Token
// send response and cookies with refresh and access Token

const {Email,Password} = req.body;
console.log(`${Email},${Password}`)

if([Email,Password].some((option)=>option.trim(" ") === "")){
//  throw ApiError(400,'Empty fileds are not allowed',Error)
return res.status(409).json("All fields required!")
}

const user = await User.findOne({Email});

// console.log(user);

const isPasswordCorrect = await user.PasswordCheck(Password);

console.log(isPasswordCorrect)

if(!isPasswordCorrect){
   throw new ApiError(500,"wrong Password",Error)
} 

const {accessToken,refreshToken} = await GenerateAccessAndRefreshToken(user);

console.log(accessToken)
console.log(refreshToken)

const option = {
   // secure : true,
   httpOnly : true,
   // origin : process.env.CORS_ORIGIN,
   // SameSite: 'None' 
}

res.status(200)
.cookie("accessToken",accessToken,option)
.cookie("refreshToken",refreshToken,option) 
.json(
   new ApiResponse(200,{user,accessToken,refreshToken},'user logged in suceessfully!')
)
 

}

export const Logout = async(req,res)=>{

//   const {_id} = req.body

//   console.log(req.body)
//   console.log(_id)

//   if(!_id){
//    return res.status(444)
//    .json(new ApiResponse(444,"No user details been sent"))
//   }
console.log("inside the logout")
console.log(req.user._id)
console.log(req.user.FullName)

  const Userr = await User.findOneAndUpdate(
   req.user._id,
   {$set:{refreshToken:""}},
   {new:true}
  )
  console.log(Userr) 

//   if(!Userr){
//    // throw new ApiError(444,"error while removing sessions",Error)
//    return res.status(444)
//    .json(new ApiResponse(444,"Error while deleting Session"))
//   }

  const options = {
   httpOnly : true,
   // origin : process.env.CORS_ORIGIN,
   SameSite: 'None' 
}
  res
 .status(200)
 .clearCookie("accessToken",options)
 .clearCookie("refreshToken",options)
 .json(new ApiResponse(200,"User Logged Out Succesfully"))
}


export const ForgotPassword = async(req,res)=>{
   const{Email} = req.body;
   console.log(Email)
   console.log(req.body)
   try {
      
   const user = await User.findOne({Email : Email});
   
   console.log(user)

   if(!user){
      return res.status(404).json(new ApiResponse(404,"User not found"));
   }

   const token = jwt.sign({userId : user._id},process.env.FORGOT_PASS_TOKEN_KEY,{expiresIn: "10m",});

   console.log(token)

   const transporter = nodemailer.createTransport({
      service:"gmail",
      auth : {
         user: process.env.EMAIL,
         pass: process.env.PASSWORD
      },
   });

   const mailOptions = {
      from : process.env.EMAIL,
      to: Email,
      subject : "Reset Password",
      html : `<h1>Reset Your Password</h1>
      <p>Click on the following link to reset your password:</p>
      <a href="http://localhost:5173/reset-password/${token}">http://localhost:5173/reset-password/${token}</a>
      <p>The link will expire in 10 minutes.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>`,
      
   }
   transporter.sendMail(mailOptions,(err,info)=>{
      if(err){
         return res.status(500).json(new ApiResponse(500,err.message,"beda gar ho tera"));
      }
      res.status(200).json(new ApiResponse(200,"Email Sent"));
   });

   } catch (error) {
      res.status(500).json(new ApiResponse(500,error))
   }
}


export const ResetPassword = async(req,res)=>{
   let {new_password} = req.body;
   // console.log(req.body)
   // console.log(new_password)
   try {
      const decodedToken = jwt.verify(
         req.params.token,
         process.env.FORGOT_PASS_TOKEN_KEY
      ); 

         // console.log(decodedToken)

      if(!decodedToken){
         return res.status(401).json(new ApiResponse(401,"InvalidToken"));
      }

      const user = await User.findOne({_id : decodedToken.userId});

      // console.log(user)

      if(!user){
         return res.status(401).json(new ApiResponse(401,"no user found"))
      }
         // const salt = await bcrypt.genSalt(10);
         // console.log(salt)
         new_password = await bcrypt.hash(new_password ,12);

      // console.log(new_password)

      user.Password = new_password;
      await user.save();

      res.status(200).json(new ApiResponse(200,"Password Updated"));
   } catch (error) {
      res.status(500).json(new ApiResponse(500,error))
   }
} 












 //things to be done for the user sign in 

//   > take the data then check if there are not empty 
//   >next check email is proper email typeof is right or not
//   >user token genreration
//   >encrypt the Password
//   >save the details in Db
//   >then send the response with cookie of access token



// const referer = req.headers.referer;
//     console.log('Referer:', referer);

//     // Check Origin header
//     const origin = req.headers.origin;
//     console.log('Origin:', origin);

//     // Check IP address
//     const ip = req.ip;
//     console.log('IP Address:', ip);

//     // Check request route
//     const routePath = req.route.path;
//     console.log('Route Path:', routePath);

//     // Respond to the request
//     res.send('Received request from ' + (referer || origin || ip || 'unknown'));