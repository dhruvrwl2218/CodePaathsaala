import { Router } from "express";
import {
    UserLogIn,
    UserSignIn,
    Logout,
    ForgotPassword,
    ResetPassword,
    RefreshAccessToken,
    deleteUser
}from '../Controller/UserController.js'
import VerifyUser from "../Middleware/AuthMiddleware.js";

const router = Router();
 
router.route('/SignIn/:Role')
.post(UserSignIn)

router.route('/logIn')
.post(UserLogIn)

router.route('/logout')
.post(VerifyUser,Logout);

router.route("/forgot-Password").post(ForgotPassword)

router.route("/reset-Password/:token").post(ResetPassword)

router.route("/refreshTokens/:_id").get(RefreshAccessToken);

router.route("/removeUser/:_id").delete(deleteUser);

export default router;

 


// console.log("u re in routes")

// router.route('/')
// .post(RegisterUser)
// .get(GetUser)
// router.route('/ChangePassword')
// .post(ChangePassword)
