import { ApiError } from "../Utils/Errors.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { User } from "../Models/UserModel.js";
import { Enroll } from "../Models/EnrollementModel.js";
import { Course } from "../Models/CourseModel.js";
import crypto from "crypto";
import Razorpay from "razorpay";
import { v4 as uuidv4 } from "uuid";

const generateCustomUUIDWithDetails = (info) => {
  const uuid = uuidv4();
  const timestamp = Date.now(); // Current timestamp in milliseconds
  return `${info}-${timestamp}-${uuid}`;
};

// export const getKey = async (req, res) => {
//   const enrolldata = req.body;

//   const { User_id, Course_id } = enrolldata;

//   try {
//     const CheckEnrollment = await Enroll.findOne().where({
//       User: { $eq: User_id },
//       Course: { $eq: Course_id },
//     });

//     if (CheckEnrollment) {
//       throw new ApiError(409, "already enrolled in this course");
//     }

//     const key = process.env.RAZORPAY_KEY;
//     return res
//       .status(200)
//       .json(new ApiResponse(200, { key }, "here is your key..."));
//   } catch (error) {
//     const statuscode = error.statuscode || 500;
//     res
//       .status(statuscode)
//       .json(new ApiResponse(statuscode, {}, error.message || "can't get key"));
//   }
// };

// export const checkout = async (req, res) => {
//   const { amount } = req.body;
//   // console.log(amount)
//   const instance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY,
//     key_secret: process.env.RAZORPAY_SECRET,
//   });

//   const options = {
//     amount: Number(amount * 100),
//     currency: "INR",
//   };
//   try {
//     const order = await instance.orders.create(options);
//     // console.log(order);
//     res
//       .status(200)
//       .json(
//         new ApiResponse(
//           200,
//           { order },
//           "order Id has been cerated sucessfully :)..!"
//         )
//       );
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(new ApiResponse(500, {}, "unable to create order"));
//   }
// };

// export const paymentverificationandEnrollment = async (req, res) => {
//   const {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//     amount,
//     User_id,
//     Course_id,
//   } = req.body;

//   const body = razorpay_order_id + "|" + razorpay_payment_id;

//   const expectedSingnature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_SECRET)
//     .update(body.toString())
//     .digest("hex");

//   const isauth = expectedSingnature === razorpay_signature;

//   try {
//     if (!isauth) {
//       throw new ApiError(400).json("invalid payment signature!");
//     }

//     const newEnrollment = new Enroll({
//       User: User_id,
//       Course: Course_id,
//       status: "completed",
//       PaymentDetails: {
//         amount: amount,
//         paymentDate: new Date(),
//         razorpayOrderId: razorpay_order_id,
//         razorpayPaymentId: razorpay_payment_id,
//         razorpaySignature: razorpay_signature,
//       },
//     });

//     const enrolled = await newEnrollment.save();

//     res.status(200).json(new ApiResponse(200, "Enrollment sucessfull :)"));
//   } catch (error) {
//     console.log(error);
//     const statuscode = error.statuscode || 500;
//     res
//       .status(statuscode)
//       .json(new ApiResponse(statuscode, {}, "Problem while enrolling"));
//   }
// };

export const Enrollment = async (req, res) => {
  console.log("body:", req.body);
  const enrolldata = req.body;

  const orderID = generateCustomUUIDWithDetails("order");
  const PaymentId = generateCustomUUIDWithDetails(enrolldata.Amount);
  const SignId = generateCustomUUIDWithDetails(enrolldata.email);

  try {
      const CheckEnrollment = await Enroll.findOne().where({
            User: { $eq: enrolldata.User_id },
            Course: { $eq: enrolldata.Course_id },
        });
      
      if (CheckEnrollment) {
          throw new ApiError(409, "already enrolled in this course");
      }
    const newEnroll = new Enroll({
      User: enrolldata.User_id,
      Course: enrolldata.Course_id,
      status: "completed",
      PaymentDetails: {
        amount: enrolldata.Amount,
        PaymentData: Date.now,
        razorpayOrderId: orderID,
        razorpayPaymentId: PaymentId,
        razorpaySignature: SignId,
      },
    });

    const enrollment = await newEnroll.save();
    
    res
      .status(200)
      .json(new ApiResponse(200, "Sucessfully Enrolled in Course", enrollment));
  } catch (error) {
    const statuscode = error.statuscode || 500;
    return res
      .status(statuscode)
      .json(
        new ApiResponse(
          statuscode,
          {},
          error.message || "Internal Server Error"
        )
      );
    }
};
export const GetEnrolledUser = async (req, res) => {
  try {
    const enrollments = await Enroll.find()
      .populate("User", "FullName Email")
      .populate("Course", "Name");

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
    // console.log(error);
    res
      .status(500)
      .json(new ApiResponse(500, {}, "Unable get the Enrolled userList"));
  }
};

export const CourseEnrolledUser = async (req, res) => {
  const { course_id } = req.body;

  if (!course_id) {
    res.status(401).json(new ApiResponse(401, {}, "plz send the id"));
  }
  try {
    const EnrolledUsers = await Enroll.find({ Course: course_id }).populate(
      "User",
      "FullName Email"
    );

    if (EnrolledUsers.length === 0) {
      res
        .status(200)
        .json(new ApiResponse(200, {}, "no enrollments are there"));
    }

    if (!EnrolledUsers) {
      throw new ApiError(500, {}, "Unable to fetch user");
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, { EnrolledUsers }, "User Fetched Successfully!")
      );
  } catch (error) {
    // console.log(error);

    res.status(error.statuscode).json(new ApiResponse(error));
  }
};

export const EnrolledUserCourses = async (req, res) => {
  const { User_id } = req.params;

  if (!User_id) {
    res
      .status(401)
      .json(
        new ApiResponse(401, {}, "there is some glitch here id not recieved")
      );
  }
  try {
    const enrollement = await Enroll.find({ User: User_id })
      .populate({
        path: "Course",
        select: "Thumbnail Name Description Level StudyMaterial Duration -_id",
      })
      .exec();

    const enrolledCourse = enrollement.map((enrollment) => enrollment.Course);

    if (!enrolledCourse) {
      throw new ApiError(500, "Internal server Error!");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, enrolledCourse, "Course fetched successfully")
      );
  } catch (error) {
    const statuscode = error.statuscode || 500;
    // console.log(error);
    return res
      .status(statuscode)
      .json(
        new ApiResponse(
          statuscode,
          {},
          error.message || "unable to get the enrolled user courses"
        )
      );
  }
};

export const deleteEnrollment = async (req, res) => {
  const { _id } = req.params;

  if (!_id) {
    //there is no need to check as it is params but still
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "Plz provide the enrollment id"));
  }
  try {
    const Enrollement = await Enroll.find({ _id });

    if (!Enrollement) {
      throw new Error(401, {}, "No enrollment were there with this id ");
    }

    const deleteEnrollment = await Enroll.deleteOne({ _id });

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
    const statuscode = error.statuscode || 500;
    return res
      .status(statuscode)
      .json(
        new ApiResponse(
          statuscode,
          {},
          error.message || "Unable to deleting the Enrollment!"
        )
      );
  }
};
