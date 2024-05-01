import jwt from "jsonwebtoken"
import { ApiError } from "../Utils/Errors.js";
import {ApiResponse} from "../Utils/ApiResponse.js"
import { User } from "../Models/UserModel.js";

const VerifyUser = async (req,res,next) => {
 
 const EncodedAccessToken = req?.cookies?.accessToken;
//  console.log(EncodedAccessToken)
//  console.log(req?.headers?.cookies)
//  console.log(req?.cookies) 
//  console.log(req?.headers) 
 
 if(!EncodedAccessToken){
    // throw new ApiError(400,"NO Access Token");
    return res.status(401).json(new ApiError(403,'Plz provide the acesstoken'))
 } 
 console.log(EncodedAccessToken)

  const decodedToken =  jwt.verify(EncodedAccessToken,process.env.ACCESS_TOKEN_KEY)

  console.log(decodedToken)

  const user = await User.findById(decodedToken._id).select("-Password -refreshToken")

  console.log(user)

  if(!user){
    throw new ApiResponse(505,"user not avialable")
  }

 req.user = user
 next()

} 

export default VerifyUser;
