import { ApiError } from "../Utils/Errors.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { User } from "../Models/UserModel.js";
import { Enroll } from "../Models/EnrollementModel.js";
import { Course } from "../Models/CourseModel.js";
import {ContactUs} from "../Models/ContactUs.js"
import mongoTransaction from "../Utils/Transaction.js";
//this model is for utility as req or end-points which does'nt belong to any
// of one specific model or envolves multiple models then this controller is used

export const AdminStats = async (req, res) => {

  const transactionalData = async(session) =>{
    const LoggedUser = await User.countDocuments().session(session);

    if(!LoggedUser)throw new ApiError(500,"errow while fetching stats")

    const TotalEnrollemnets = await Enroll.countDocuments().session(session);

    if(!TotalEnrollemnets)throw new ApiError(500,"errow while fetching stats")

    const TotalCourses = await Course.countDocuments().session(session);

    if(!TotalCourses)throw new ApiError(500,"errow while fetching stats");

    const stats = { LoggedUser, TotalEnrollemnets, TotalCourses };
    return stats;
  }
  try {
    const stats = await mongoTransaction(transactionalData);
    res
      .status(200)
      .json(
        new ApiResponse(200, stats, "Appications stats are fetched ...")
      );
  } catch (error) {
    console.log(error);
    const statuscode = error.statuscode || 500;
    res
      .status(statuscode)
      .json(new ApiResponse(statuscode,{}, error.message || "error occured while fetching admin stats"));
  }
};

export const Issues = async(req,res) =>{
  const {Name,Email,PhoneNo,Categories,Message} = req.body;
  
  if ([Name,Email,PhoneNo,Categories,Message].some((e) => e?.trim() === "")) {
    return res
      .status(500)
      .json(new ApiResponse(500, "All fields are required!"));
  }
 try {
  const details = await ContactUs.create({
    Name : Name,
    Email : Email,
    PhoneNo : PhoneNo,
    Categories : Categories,
    Message : Message
  })
  if(!details){
    throw new Error("NOt able to process"); 
  }
  res.status(200).json(new ApiResponse(200,"we will connect with you soon!!!"))
 } catch (error) {
  // console.log(error)
  res.status(400).json(new ApiResponse(400,"issue while sending the message"))
 }
}