import { Router } from "express";
import {
  UserLogIn,
  UserSignIn,
  Logout,
  ForgotPassword,
  ResetPassword,
  RefreshAccessToken,
  deleteUser,
} from "../Controller/UserController.js";
import VerifyUser from "../Middleware/AuthMiddleware.js";
import IsAdmin from "../Middleware/IsAdminMiddleware.js";


const router = Router();

router.route("/SignIn/:Role").post(UserSignIn);

router.route("/logIn").post(UserLogIn);

router.route("/logout").post(VerifyUser, Logout);

router.route("/forgot-Password").post(ForgotPassword);

router.route("/reset-Password/:token").post(ResetPassword);

router.route("/refreshTokens/").get(RefreshAccessToken);

router.route("/removeUser/:_id").delete(VerifyUser,IsAdmin,deleteUser);

export default router;

