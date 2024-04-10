import { ApiError } from "../Utils/Errors.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { User } from "../Models/UserModel.js";
import { Enroll } from "../Models/EnrollementModel.js";
import { Course } from "../Models/CourseModel.js";

export const Enrollement = async (req, res) => {
  const { email, courseId } = req.body;

  console.log(email, courseId);

  if (email === "" || courseId === "") {
    res.status(400).json(new ApiResponse(400, "Empty fields are sent"));
  }
  if (!email || !courseId) {
    res.status(400).json(new ApiResponse(400, "Empty fields are sent"));
  }
  
  try {
    const user = await User.findOne({ Email: email }, { _id: 1 });

    if (!user) {
      console.log("user not found witht his id");
    }
 
    const newEnrollment = new Enroll({ User: user._id, Course: courseId });

    const Enrolled = await newEnrollment.save();

    console.log(Enrolled);

    res
      .status(200)
      .json(new ApiResponse(200, {}, "User successfully Enrolled"));
  } catch (error) {
    console.log(error);
  }
};

export const GetEnrolledUser = async (req, res) => {
  const enrollments = await Enroll.find()
    .populate("User", "FullName Email")
    .populate("Course", "Name");

  // const students = {};
  // enrollments.forEach(enrollment =>{
  //     const _id = enrollment._id;

  // })

  res
    .status(200)
    .json(
      new ApiResponse(200, { enrollments }, "Enrolled user fetched succesfully")
    );
};

export const CourseEnrolledUser = async (req, res) => {
  const { course_id } = req.body;

  console.log(course_id);
  console.log(req.body);

  if (!course_id) {
    res
      .status(401)
      .json(
        new ApiResponse(
          401,
          {},
          "id has not been recieved for fetching the realted enrolled users"
        )
      );
  }
  try {
    const EnrolledUsers = await Enroll.find({ Course: course_id }).populate(
      "User",
      "FullName Email"
    );

    console.log(EnrolledUsers);

    if (EnrolledUsers.length === 0) {
      res
        .status(200)
        .json(
          new ApiResponse(200, {}, "No User has been Enrolled in the course")
        );
    }

    console.log("haalye lluiya");

    if (!EnrolledUsers) {
      res
        .status(500)
        .json(new ApiResponse(500, {}, "failed while fetching the users"));
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, { EnrolledUsers }, "User Fetched Successfully!")
      );
  } catch (error) {
    res.status(500).json(new ApiResponse(500, {}, "error while operation"));
  }
};

export const EnrolledUserCourses = async (req,res)=>{
  const {User_id} = req.params;
  console.log(req.params)
  console.log("haa mein galat" + User_id)
  if(!User_id){
    res.status(401).json(new ApiResponse(401,{},"User id is not recieved check wheather the user is logged in or any client side issue id there"))
  }
  try {
    const enrollement = await Enroll.find({User : User_id}).populate({path : 'Course',select : 'Thumbnail Name Description Level StudyMaterial Duration -_id'}).exec();
   
    console.log(enrollement)
    const enrolledCourse = enrollement.map(enrollment => enrollment.Course);

    console.log(enrolledCourse)
    if(!enrolledCourse){
      return res.json(new ApiError(500,"Internal server Error!"))
    }
    return res.status(200).json(new ApiResponse(200,enrolledCourse,"Courses retrive successfully"));
 

  } catch (error) {
    // return res.json(new ApiError(500,"Internal server Error!"))
    console.log(error)
  }
}

// {

//    //    if(updatedCourseDoc){
// //     throw new ApiError(500,"uCD",Error)
// //    }

//    const Enrolled = await newEnrollment.save()

//    //    if(updatedCourseDoc){
// //     throw new ApiError(500,"uCD",Error)
// //    }

//    console.log(Enrolled._id)

// //    user.EnrolledCourses.push(Enrolled._id);

// //    const UpdatedUser = user.save()

// //       if(updatedCourseDoc){
// //     throw new ApiError(500,"uCD",Error)
// //    }

// //    console.log(UpdatedUser);

// //    const course = await Course.findById(courseId)

// //       if(updatedCourseDoc){
// //     throw new ApiError(500,"uCD",Error)
// //    }

// //    course.EnrolledUser.push(Enrolled._id);

// //    const updatedCourseDoc = await course.save();

// //    if(updatedCourseDoc){
// //     throw new ApiError(500,"uCD",Error)
// //    }
// //    console.log(updatedCourseDoc)

// }s
