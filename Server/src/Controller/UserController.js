import { Error } from "mongoose";
import { User } from "../Models/UserModel.js";
import { Enroll } from "../Models/EnrollementModel.js";
import { ApiError } from "../Utils/Errors.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pkg from "nodemailer/lib/xoauth2/index.js";
const { errorMonitor } = pkg;

const GenerateAccessAndRefreshToken = async (user) => {
  const accessToken = await user.GenerateAccessToken();
  const refreshToken = await user.GenerateRefreshToken();

  try {
    await User.updateOne(
      { _id: user._id },
      { $set: { refreshToken: refreshToken } }
    );
  } catch (error) {
    throw new Error("Error updating refreshToken");
  }

  return { accessToken, refreshToken };
};

export const UserSignIn = async (req, res) => {
  const { FullName, Email, Password } = req.body;

  let { Role } = req.params;

  if ([FullName, Email, Password].some((e) => e?.trim() === "")) {
    return res
      .status(500)
      .json(new ApiResponse(500, "All fields are required!"));
  }

  function isValidEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  }

  if (!isValidEmail(Email)) {
    return res.status(409).json(new ApiResponse(409, "Email is not valid"));
  }

  try {
    const UserCheck = await User.findOne({ Email });

    if (UserCheck) {
      throw new ApiError(409, "User with email or username already exists");
    }

    Role = process.env.EMAIL === Email ? "Admin" : Role;
    //more you can add the array of emails which are of admin's ,
    // and loop it and check if email sent by user as any of the eamil from that array then Role would be admin

    const user = await User.create({
      FullName: FullName,
      Email: Email,
      Password: Password,
      Role: Role,
    });

    const ConfirmUser = User.findById(user.id);

    if (!ConfirmUser) {
      new ApiError(500, "Somethings went wrong while Signing In");
    }

    res.json(new ApiResponse(200, user, "user Regestired successfullly!"));
  } catch (error) {
    // console.log(error);
    res.status(500).json(new ApiResponse(500, error));
  }
};
export const UserLogIn = async (req, res) => {
  const { Email, Password } = req.body;

  if ([Email, Password].some((option) => option.trim(" ") === "")) {
    return res.status(409).json("All fields required!");
  }

  try {
    const user = await User.findOne({ Email });

    if (!user) {
      throw new ApiError(
        401,
        { user },
        "User with this email is not present in db"
      );
    }
     
    console.log(Password);
    const isPasswordCorrect = await user.PasswordCheck(Password);

    if (!isPasswordCorrect) {
      throw new ApiError(500, "wrong Password");
    }

    const { accessToken, refreshToken } = await GenerateAccessAndRefreshToken(
      user
    );

    res
      .status(200)
      .cookie("accessToken", accessToken, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,       
        sameSite: 'None',
      })
      .cookie("refreshToken", refreshToken, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,       
        sameSite: 'None',
      })
      .json(
        new ApiResponse(
          200,
          { user, accessToken, refreshToken },
          "user logged in suceessfully!"  
        )
      );
  } catch (error) {
    console.log(error);
    return res.status(error.statuscode).json(error);
  }
};

export const Logout = async (req, res) => {
  try {
    const Userr = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { refreshToken: "" } },
      { new: true }
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    };
    res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200,{},"User Logged Out Succesfully"));
  } catch (error) {
    // console.log(error);
    res
      .status(error.statuscode)
      .json(new ApiResponse(error.statuscode, "Error while logging out!"));
  }
};

export const ForgotPassword = async (req, res) => {
  const { Email } = req.body;

  try {
    const user = await User.findOne({ Email: Email });

    if (!user) {
      throw new ApiError(404).json(
        404,
        "No user is avilable with this name :("
      );
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.FORGOT_PASS_TOKEN_KEY,
      { expiresIn: "5m" }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: Email,
      subject: "Reset Password",
      html: `<h1>Reset Your Password</h1>
      <p>Click on the following link to reset your password:</p>
      <a href="http://localhost:5173/reset-password/${token}">Password reset</a>
      <p>The link will expire in 5 minutes.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        throw new ApiError(
          500,
          err,
          "Error occured while sending the pass-reset mail"
        );
      }

      res
        .status(200)
        .json(new ApiResponse(200, "Link has been sent to your mail id"));
    });
  } catch (error) {
    res.status(error.statuscode).json(error);
  }
};

// address the issue here may getting the status 200 fake response 
export const ResetPassword = async (req, res) => {
  const  { new_password } = req.body;
  const {token} = req.params;

  if(!new_password){
  res.status(403).json(new ApiError(403,"plz send the new pass to reset"))
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.FORGOT_PASS_TOKEN_KEY
    );

    if (!decodedToken) {
      throw new ApiError(401).json(401, "Invalid token or Token expired!!!");
    }

    const user = await User.findOne({ _id: decodedToken.userId });


    if (!user) {
      throw new ApiError(401).json(401, "Unable to find the UserID!");
    }

    user.Password = new_password;
    await user.save(); 

    res.status(200).json(new ApiResponse(200,"Password Updated"));
  } catch (error) {
    res.status(error?.statuscode?error?.statuscode:500).json(new ApiResponse(error.statuscode, error));
  }
};

export const RefreshAccessToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    const newuser = await User.updateOne(
      { _id: req.params._id },
      { $set: { refreshToken: "" } },
      { new: true }
    );
    console.log(newuser);
    res
      .status(403)
      .json(
        new ApiResponse(
          403,
          {},
          "refresh Token is not avilable unauthorized user!"
        )
      );
  } else {
    try {
      const decodedrefreshToken = jwt.verify(
        token,
        process.env.REFRESH_TOKEN_KEY
      );

      const { _id } = decodedrefreshToken;

      if (!_id) {
        throw new ApiError(400, {}, "Refresh token is not valid !!");
      }

      const user = await User.findById(_id);

      if (!user) {
        throw new ApiError(
          400,
          {},
          "Refresh token is not valid or may expired !!"
        );
      }

      if (token !== user?.refreshToken) {
        throw new ApiError(
          400,
          {},
          "Refresh token does'nt matches with user has Provided"
        );
      }

      const { accessToken, refreshToken } = await GenerateAccessAndRefreshToken(
        user
      );

      const options = {
        secure : true,
        httpOnly: true,
        SameSite: 'None'
      };

      res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
          new ApiResponse(
            200,
            { accessToken, refreshToken },
            "Tokens Refreshed Successfully!"
          )
        );
    } catch (error) {
      // console.log(error);
      return res.status(error.statuscode).json(new ApiResponse(error));
    }
  }
};

export const deleteUser = async (req, res) => {
  const { _id } = req.params;

  if (!_id) {
    res
      .status(401)
      .json(
        new ApiResponse(
          401,
          {},
          "bad req,plz provide the user id of user u want to dlt"
        )
      );
  }
  // console.log(_id);
  try {
    const result = await User.deleteOne({ _id: _id });

    if (result.deletedCount !== 1) {
      throw new ApiError(401, "No user was found with this id");
    }
    //then here dlt all the enrolled doc with this id

    // const result2 = Enroll.deleteMany({_id :_id});

    const enrollments = Enroll.countDocuments({ User: _id });

    if (enrollments > 0) {
      const dltEnrollments = await Enroll.deleteMany({ User: _id });

      if (dltEnrollments.deletedCount !== enrollments) {
        console.log("Chances of error glich in matrix");
      }
    }

    res.status(200).json(200, {}, "User has been removed");
  } catch (error) {
    // console.log(error);
    res.status(error.statuscode).json(error);
  }
};
