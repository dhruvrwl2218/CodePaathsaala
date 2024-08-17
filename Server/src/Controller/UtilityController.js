import { ApiError } from "../Utils/Errors.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { User } from "../Models/UserModel.js";
import { Enroll } from "../Models/EnrollementModel.js";
import { Course } from "../Models/CourseModel.js";
import {ContactUs} from "../Models/ContactUs.js"

//this model is for utility as req or end-points which does'nt belong to any
// of one specific model or envolves multiple models then this controller is used

export const AdminStats = async (req, res) => {
  try {
    const LoggedUser = await User.countDocuments();

    const TotalEnrollemnets = await Enroll.countDocuments();

    const TotalCourses = await Course.countDocuments();

    // console.log(LoggedUser + "......." + TotalCourses + "....." + TotalEnrollemnets)

    const data = { LoggedUser, TotalEnrollemnets, TotalCourses };

    res
      .status(200)
      .json(
        new ApiResponse(200, { data }, "Appications stats are fetched ...")
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(new ApiResponse(500, "error occured while fetching admin stats"));
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
  console.log(error)
  res.status(400).json(new ApiResponse(400,"issue while sending the message"))
 }
}