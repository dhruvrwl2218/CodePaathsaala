import { ApiError } from "../Utils/Errors.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { User } from "../Models/UserModel.js";
import { Enroll } from "../Models/EnrollementModel.js";
import { Course } from "../Models/CourseModel.js";
import crypto from "crypto";
import Razorpay from "razorpay"
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

export const getKey = async (req , res) =>{
    const key = {key:process.env.KEY}
    return res.status(200).json(new ApiResponse(200,{key},"here is your key..."))
}

export const checkout = async (req, res) => {
  const { amount } = req.body;

  const instance = new Razorpay({
    key_id: process.env.KEY,
    key_secret: process.env.SECRET,
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

export const paymentverification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSingnature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isauth = expectedSingnature === razorpay_signature;

  if (isauth) {
    res.redirect(
      `http://localhost:5173/paymentsuccess?reference=${
        (razorpay_payment_id, razorpay_order_id, razorpay_signature)
      }`
    );
  }else{
    res.status(400).json(new ApiError(400,"error while making the transaction"))
  }
};
