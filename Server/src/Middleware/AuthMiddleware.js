import jwt from "jsonwebtoken"
import { ApiError } from "../Utils/Errors.js";
import {ApiResponse} from "../Utils/ApiResponse.js"
import { User } from "../Models/UserModel.js";

const VerifyUser = async (req,res,next) => {
 
 const EncodedAccessToken = req?.cookies?.accessToken;
 
 if(!EncodedAccessToken){
    return res.status(401).json(new ApiResponse(401,{},"Plz provide the acesstoken"))
 } 

  const decodedToken =  jwt.verify(EncodedAccessToken,process.env.ACCESS_TOKEN_KEY)

  const user = await User.findById(decodedToken._id).select("-Password -refreshToken")

  if(!user){
    throw new ApiResponse(505,"user not avialable")
  }

 req.user = user
 next()

} 

export default VerifyUser;
