import { ApiError } from "../Utils/Errors.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

const IsAdmin = async (req, res, next) => {
  const admin = req.user.Role;
  console.log("is admin " + admin);
  if (admin !== "Admin") {
    res.status(401).json(new ApiResponse(401, {}, "only admins are allowed !"));
  }

  next();
};

export default IsAdmin;
