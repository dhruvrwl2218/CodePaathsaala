import { ApiError } from "../Utils/Errors.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { User } from "../Models/UserModel.js";
import { Enroll } from "../Models/EnrollementModel.js";
import { Course } from "../Models/CourseModel.js";
import crypto from "crypto";
import Razorpay from "razorpay";
import { error } from "console";

export const getKey = async (req, res) => {
  const enrolldata = req.body;

  const { User_id, Course_id } = enrolldata;

  try {
    const CheckEnrollment = await Enroll.findOne().where({
      User: { $eq: User_id },
      Course: { $eq: Course_id },
    });

    if (CheckEnrollment) {
      throw new ApiError(409, "you're already enrolled in this Course");
    }

    const key = process.env.RAZORPAY_KEY;
    return res
      .status(200)
      .json(new ApiResponse(200, { key }, "here is your key..."));
  } catch (error) {
    res.status(409).json(new ApiResponse(error.statuscode, {}, error.message));
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

  // console.log(order);

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
    // console.log(error);
    res.status(401).json(new ApiResponse(error));
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
    res.status(error.statuscode).json(new ApiResponse(error));
  }
};

export const CourseEnrolledUser = async (req, res) => {
  const { course_id } = req.body;

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

    if (EnrolledUsers.length === 0) {
      res
        .status(200)
        .json(
          new ApiResponse(200, {}, "No User has been Enrolled in the course")
        );
    }

    if (!EnrolledUsers) {
      throw new ApiError(500, {}, "failed while fetching the users");
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

    const enrolledCourse = enrollement.map((enrollment) => enrollment.Course);

    if (!enrolledCourse) {
      throw new ApiError(500, "Internal server Error!");
    }
    return res.status(200).json(new ApiResponse(error));
  } catch (error) {
    // console.log(error);
    return res.status(error.statuscode).json(new ApiResponse(error));
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
    return res.status(error.statuscode).json(error);
  }
};
