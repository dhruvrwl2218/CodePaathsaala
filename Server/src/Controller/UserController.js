import { Error } from "mongoose";
import { User } from "../Models/UserModel.js";
import { Enroll } from "../Models/EnrollementModel.js";
import { ApiError } from "../Utils/Errors.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const GenerateAccessAndRefreshToken = async (user) => {
  const accessToken = await user.GenerateAccessToken();
  const refreshToken = await user.GenerateRefreshToken();

  try {
    await User.updateOne({ _id: user._id }, { $set: { refreshToken: refreshToken } });
  } catch (error) {
    throw new Error("Error updating refreshToken");
  }
  // try {
  //   user.refreshToken = refreshToken;
  //  const newdata = await user.save();

  //  console.log(newdata)

  // } catch (error) {
  //   error; 
  // }

  return { accessToken, refreshToken };
};

export const UserSignIn = async (req, res) => {
  const { FullName, Email, Password } = req.body;

  let { Role } = req.params;

  // console.log(params);

  // console.log(`${FullName},${Email},${Password}`);

  if ([FullName, Email, Password].some((e) => e?.trim() === "")) {
    // throw new ApiError("All the credentails are needed",Error)
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
    //   throw new ApiError("email is not valid",Error)
    //  return new ApiResponse(500,"Email is not valid")
    return res.status(409).json(new ApiResponse(409, "Email is not valid"));
  }
try {
  
    const UserCheck = await User.findOne({ Email });
  
    if (UserCheck) {
      throw new ApiError(409, "User with email or username already exists");
      // return res.status(409).json(new ApiResponse(409, "user Already exits"));
    }
    // console.log(Email);
  
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
      new ApiResponse(500, "Somethings went wrong while Signing In");
    }
  
    res.json(new ApiResponse(200, user, "user Regestired successfullly!"));
  
} catch (error) {
  console.log(error)
  res.status(500).json(new ApiResponse(500,error))
}
}
export const UserLogIn = async (req, res) => {
 
  const { Email, Password } = req.body;
  // console.log(`${Email},${Password}`);

  if ([Email, Password].some((option) => option.trim(" ") === "")) {
    return res.status(409).json("All fields required!");
  }

try {
  
    const user = await User.findOne({ Email });
  
    // console.log(user);

    if(!user){
      throw new ApiError(401,{user}, "User with this email is not present in db");
    }
    
    const isPasswordCorrect = await user.PasswordCheck(Password);
  
    // console.log(isPasswordCorrect);
  
    
    if (!isPasswordCorrect) {
      throw new ApiError(500, "wrong Password",);
    }
  
    const { accessToken, refreshToken } = await GenerateAccessAndRefreshToken(user);
   
    // console.log(accessToken);
    // console.log(refreshToken);
  
 
    // const option = {
    //   // secure : true,
    //   httpOnly: true,
    //   expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    //   // origin : process.env.CORS_ORIGIN,
    //   // SameSite: 'None'
    // };
  
    res
      .status(200)
      .cookie("accessToken", accessToken, {expires: new Date(Date.now() + 24 * 60 * 60 * 1000),httpOnly: true} )
      .cookie("refreshToken", refreshToken, {expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),httpOnly: true} )
      .json(
        new ApiResponse(
          200,
          { user, accessToken, refreshToken },
          "user logged in suceessfully!"
        )
      );
} catch (error) {
  console.log(error)
  return res.status(error.statuscode).json(error)
}
};

export const Logout = async (req, res) => {
  
  const Userr = await User.findOneAndUpdate(
    {_id : req.user._id},
    { $set: { refreshToken: "" } },
    { new: true }
  );
  console.log(Userr);

  //   if(!Userr){
  //    // throw new ApiError(444,"error while removing sessions",Error)
  //    return res.status(444)
  //    .json(new ApiResponse(444,"Error while deleting Session"))
  //   }

  const options = {
    httpOnly: true,
    // origin : process.env.CORS_ORIGIN,
    SameSite: "None",
  };
  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User Logged Out Succesfully"));
};

export const ForgotPassword = async (req, res) => {
  const { Email } = req.body;
  // console.log(Email);
  // console.log(req.body);
  try {
    const user = await User.findOne({ Email: Email });

    // console.log(user);

    if (!user) {
      return res.status(404).json(new ApiResponse(404, "User not found"));
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.FORGOT_PASS_TOKEN_KEY,
      { expiresIn: "10m" }
    );

    // console.log(token);

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
      <a href="http://localhost:5173/reset-password/${token}">http://localhost:5173/reset-password/${token}</a>
      <p>The link will expire in 10 minutes.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      // if (err) {
      //   return res
      //     .status(500)
      //     .json(new ApiResponse(500, err.message, "beda gar ho tera"));
      if(err){
        console.log(err);
        throw new ApiError(500,err,"Error occured while sending the pass-reset mail");
      }
      
      res.status(200).json(new ApiResponse(200, "Email Sent"));
     
    }); 
  } catch (error) {
    res.status(error.statuscode).json(error);
  }
};

export const ResetPassword = async (req, res) => {
  let { new_password } = req.body;
  // console.log(req.body)
  // console.log(new_password)
  try {
    const decodedToken = jwt.verify(
      req.params.token,
      process.env.FORGOT_PASS_TOKEN_KEY
    );

    // console.log(decodedToken)

    if (!decodedToken) {
      return res.status(401).json(new ApiResponse(401, "InvalidToken"));
    }

    const user = await User.findOne({ _id: decodedToken.userId });

    // console.log(user)

    if (!user) {
      return res.status(401).json(new ApiResponse(401, "no user found"));
    }
    // const salt = await bcrypt.genSalt(10);
    // console.log(salt)
    new_password = await bcrypt.hash(new_password, 12);

    // console.log(new_password)

    user.Password = new_password;
    await user.save();

    res.status(200).json(new ApiResponse(200, "Password Updated"));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error));
  }
};

export const RefreshAccessToken = async (req, res) => {

  const token = req.cookies.refreshToken;

  console.log(req.param._id)

  if (!token) {
    const newuser = await User.updateOne( 
      {_id : req.params._id},
      {$set : {refreshToken : ""}}
    )
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
  }else{

  console.log(token)
  
  try {
  
  const decodedrefreshToken =  jwt.verify(token, process.env.REFRESH_TOKEN_KEY);

  console.log(decodedrefreshToken);

  const { _id } = decodedrefreshToken;

  console.log(_id);

  if (!_id) {
     throw new ApiError(400, {}, "Refresh token is not valid !!");
  }

  const user = await User.findById(_id);

  if (!user) {
    throw new ApiError(400, {}, "Refresh token is not valid or may expired !!");
  }

  // console.log(user);

  console.log(user.refreshToken )

  console.log( "aur ji ye lo " + token)

  if (token !== user?.refreshToken) {
    throw new ApiError(400, {}, "Refresh token does'nt matches with user has Provided");
   }

  const { accessToken, refreshToken } = await GenerateAccessAndRefreshToken(user);

  console.log(accessToken, refreshToken);

  const options = {
    // secure : true,
    httpOnly: true,
    // origin : process.env.CORS_ORIGIN,
    // SameSite: 'None'
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
    console.log(error)
    return res.status(error.status).json(new ApiResponse(error));
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
  console.log(_id)
  try {
    const result = await User.deleteOne({_id : _id});

    console.log(result )
    console.log("ab tu aaja " + result.deletedCount)

    if (result.deletedCount !== 1) {
      // res
      //   .status(401)
      //   .json(new ApiResponse(401, {}, "No user was found with this id"));
      throw new ApiError(401,"No user was found with this id")
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
    console.log(error)
    res.status(error.statuscode).json(error);
  }
};

// const referer = req.headers.referer;
//     console.log('Referer:', referer);

//     // Check Origin header
//     const origin = req.headers.origin;
//     console.log('Origin:', origin);

//     // Check IP address
//     const ip = req.ip;
//     console.log('IP Address:', ip);

//     // Check request route
//     const routePath = req.route.path;
//     console.log('Route Path:', routePath);

//     // Respond to the request
//     res.send('Received request from ' + (referer || origin || ip || 'unknown'));


// Set-Cookie: accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjIzOTE2MWYxZTZlMzUxYWQwZWJjMDkiLCJpYXQiOjE3MTM2MDcwOTEsImV4cCI6MTcxMzYwNzIxMX0.RQ0UIwGYPw-jIG6Ly6eyaeoANWv1z1KQgrP2pNhz4B4; Path=/; HttpOnly
// Set-Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjIzOTE2MWYxZTZlMzUxYWQwZWJjMDkiLCJpYXQiOjE3MTM2MDcwOTEsImV4cCI6MTcxMzY5MzQ5MX0.heed0yBp16t5wtLenXNLW0Nam5drSLGpPE7NANPq_NQ; Path=/; HttpOnly