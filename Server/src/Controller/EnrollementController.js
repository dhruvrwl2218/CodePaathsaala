import { ApiError } from "../Utils/Errors.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { User } from "../Models/UserModel.js";
import { Enroll } from "../Models/EnrollementModel.js";
import { Course } from "../Models/CourseModel.js";
import crypto from "crypto";
import Razorpay from "razorpay";

export const getKey = async (req, res) => {
  const enrolldata = req.body;

  const { User_id, Course_id } = enrolldata;
 
  console.log(req.body)
  console.log(enrolldata)

  try {
    const CheckEnrollment = await Enroll.findOne()
    .where({
      'User': { $eq: User_id },      
      'Course': { $eq: Course_id },  
    });

    console.log(CheckEnrollment)
    if (CheckEnrollment) {
      throw new ApiError(409, "you're already enrolled in this Course");
    }

    const key = process.env.RAZORPAY_KEY;
    return res
      .status(200)
      .json(new ApiResponse(200, { key }, "here is your key..."));
  } catch (error) {
    res.status(409).json(new ApiResponse(error.statuscode,{},error.message)); 
  }
};

export const checkout = async (req, res) => {
  const { amount } = req.body;

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const options = {
    amount: Number(amount * 100),
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  console.log(order);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { order },
        "order Id has been cerated sucessfully :)..!"
      )
    );
};

export const paymentverificationandEnrollment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    amount,
    User_id,
    Course_id,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSingnature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isauth = expectedSingnature === razorpay_signature;

  try {
    if (!isauth) {
      throw new ApiError(400).json("invalid payment signature!");
    }

    const newEnrollment = new Enroll({
      User: User_id,
      Course: Course_id,
      status: "completed",
      PaymentDetails: {
        amount: amount,
        paymentDate: new Date(),
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
    });

    const enrolled = await newEnrollment.save();

    res.status(200).json(new ApiResponse(200, "Enrollment sucessfull :)"));
  } catch (error) {
    console.log(error);
    res.status(401).json(new ApiResponse(error));
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
    console.log(enrollments);
    res
      .status(200)
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
    return res
      .status(error.statuscode)
      .json(new ApiError(500, "Internal server Error!"));
  }
};

export const deleteEnrollment = async (req, res) => {
  const { _id } = req.params;

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

// export const Enrollement = async (req, res) => {

//   const enrollmentData = req.body;

//   enrollmentData.map((data) => {
//     if (data === "") {
//       res.status(406).json("Plz do send all the enrollment data");
//     }
//   });
//   const {} = enrollmentData;

//   try {
//     const CheckEnrollment = await findOne({ User: User_id, Course: Course_id });

//     if (CheckEnrollment) {
//       new ApiError(409, "you're already enrolled in this Course");
//     }

//     const {
//       User_id,
//       course_id,
//       razorpayPaymentId,
//       razorpaySignature,
//       razorpayOrderId,
//     } = enrollmentData;

//     const newEnrollment = new Enroll({
//       User: User_id,
//       Course: course_id,
//       PaymentDetails: {
//         status: "completed",
//         paymentDate: new Date(),
//         azorpayOrderId: razorpayOrderId,
//         azorpayPaymentId: razorpayPaymentId,
//         razorpaySignature: razorpaySignature,
//       },
//     });

//     const Enrolled = await newEnrollment.save();

//     if (!Enrolled) {
//       throw new ApiError(500, "Errow while user Enrollement");
//     }

//     res
//       .status(200)
//       .json(new ApiResponse(200, { Enrolled }, "User successfully Enrolled"));
//   } catch (error) {
//     console.log(error);
//     res.status(error.statuscode).json(new ApiResponse(error));
//   }
// };

// const CompleteEnrollment = await Enroll(
//   { 'paymentDetails.razorpayOrderId' : razorpay_order_id },
//   {
//     status: "completed",
//     PaymentDetails : {
//       paymentDate : new Date(),
//       razorpayPaymentId: razorpay_payment_id,
//       razorpaySignature: razorpay_signature,
//     }
//   }
// );
// res.status(200).json("Enrollment Sucessfull :)")
// try {
//   const Enrollment = new Enroll({
//     User_id,
//     Course_id,
//     status: "pending",
//     PaymentDetails: { amount: amount, azorpayOrderId: order.id },
//   });
//   const Enrolled = Enrollment.save();

//   console.log(Enrolled);
// } catch (error) {}
