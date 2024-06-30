import { ApiError } from "../Utils/Errors.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { User } from "../Models/UserModel.js";
import { Enroll } from "../Models/EnrollementModel.js";
import { Course } from "../Models/CourseModel.js";

export const Enrollement = async (req, res) => {
  // console.log(req.body)
  const { User_id, Course_id } = req.body;  //,payment_id , order_id , signature   
 
  console.log(User_id, Course_id);
  // console.log(payment_id , order_id , signature);

  if (User_id === "" || Course_id === "") {
   return  res.status(400).json(new ApiResponse(400, "Empty fields are not allowed"));
  }
  if (!User_id || !Course_id) {
    return res.status(400).json(new ApiResponse(400, "fields values is not there"));
  }

  try {
    const user = await User.findOne({_id : User_id});

    if (!user) {
      // console.log("user not found witht his id"); 
      throw new ApiError(
        400,
        "Not able to find the user in Db :("
      );
    }
  //here you can also check wheather there is any user earlier enrolled
  // for the same course then give the response with the already enrolled .
    const newEnrollment = new Enroll({ User: user._id, Course: Course_id });

    const Enrolled = await newEnrollment.save();

    // console.log(Enrolled)
    if (!Enrolled) {
      throw new ApiError(500, "Errow while user Enrollement");
    }

    res
      .status(200)
      .json(new ApiResponse(200, {}, "User successfully Enrolled"));
  } catch (error) {
    console.log(error);
    res.status(error.statuscode).json(new ApiResponse(error));
  }
};

export const GetEnrolledUser = async (req, res) => {
  try {
    const enrollments = await Enroll.find()
      .populate("User", "FullName Email")
      .populate("Course", "Name");

    // const students = {};
    // enrollments.forEach(enrollment =>{
    //     const _id = enrollment._id;

    // })
    console.log(enrollments)
    res.status(200)
      .json(
        new ApiResponse(
          200,
          { enrollments },
          "Enrolled user fetched succesfully"
        )
      );
  } catch (error) {
    console.log(error);
    res.status(error.statuscode).json(new ApiResponse(error));
  }
};

export const CourseEnrolledUser = async (req, res) => {
  const { course_id } = req.body;

  // console.log(course_id);
  // console.log(req.body);

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

    // console.log(EnrolledUsers);

    if (EnrolledUsers.length === 0) {
      res
        .status(200)
        .json(
          new ApiResponse(200, {}, "No User has been Enrolled in the course")
        );
    }

    // console.log("haalye lluiya");

    if (!EnrolledUsers) {
      // res
      //   .status(500)
      //   .json(new ApiResponse(500, {}, "failed while fetching the users"));
      throw new ApiError(500, {}, "failed while fetching the users");
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, { EnrolledUsers }, "User Fetched Successfully!")
      );
  } catch (error) {
    console.log(error);
    res.status(error.statuscode).json(new ApiResponse(error));
  }
};

export const EnrolledUserCourses = async (req, res) => {
  const { User_id } = req.params;
  // console.log(req.params)
  // console.log("haa mein galat" + User_id)
  if (!User_id) {
    res
      .status(401)
      .json(
        new ApiResponse(
          401,
          {},
          "User id is not recieved check wheather the user is logged in or any client side issue id there"
        )
      );
  }
  try {
    const enrollement = await Enroll.find({ User: User_id })
      .populate({
        path: "Course",
        select: "Thumbnail Name Description Level StudyMaterial Duration -_id",
      })
      .exec();

    // console.log(enrollement);
  
    const enrolledCourse = enrollement.map((enrollment) => enrollment.Course);

    // console.log(enrolledCourse);

    if (!enrolledCourse) {
      throw new ApiError(500, "Internal server Error!");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, enrolledCourse, "Courses retrived successfully")
      );
  } catch (error) {
    console.log(error);
    return res.status(error.statuscode)
    .json(new ApiError(500,"Internal server Error!"))
  }
};

export const adminStats = async (req, res) => {};

export const deleteEnrollment = async (req, res) => {
  const { _id } = req.params;

  // console.log(_id);


  if (!_id) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "Enrollment id was not there"));
  }
  try {
    const Enrollement = await Enroll.find({ _id });

    if (!Enrollement) {
      // return res.status(401).json(new ApiResponse(401,{},"No enrollment were there with this id"))
      throw new Error(401, {}, "No enrollment were there with this id ");
    }

    const deleteEnrollment = await Enroll.deleteOne({ _id });

    // console.log(deleteEnrollment);

    if (deleteEnrollment.deletedCount > 0) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { deleteEnrollment },
            "enrollment deleted succesfully!"
          )
        );
    }
  } catch (error) {
    // console.log(error);
    return res.status(error.statuscode).json(error);
  }
};
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
