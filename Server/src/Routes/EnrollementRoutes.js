import { Router} from "express"
import { CourseEnrolledUser,
         GetEnrolledUser,
         EnrolledUserCourses,
         deleteEnrollment,
        //  getKey,
        //  checkout,
        //  paymentverificationandEnrollment
        }from "../Controller/EnrollementController.js";
 import VerifyUser from "../Middleware/AuthMiddleware.js";
 import IsAdmin from "../Middleware/IsAdminMiddleware.js";
 import { Enrollment } from "../Controller/EnrollementController.js";

const router = Router();
router.route('/enrollUser').post(VerifyUser,Enrollment);
//Razorpay payment gateway not working in production so we have created the dummy enrollment process..
// router.route("/getkey").post(VerifyUser,getKey);

// router.route("/checkout").post(VerifyUser,checkout);

// router.route("/paymentVerification").post(VerifyUser,paymentverificationandEnrollment);

router.route('/EnrolledUser').get(VerifyUser,IsAdmin,GetEnrolledUser);

router.route('/CourseEnrolledUser').get(CourseEnrolledUser);

router.route('/EnrolledCourses/:User_id').get(VerifyUser,EnrolledUserCourses);  
 
router.route('/deleteEnrollment/:_id').delete(VerifyUser,IsAdmin,deleteEnrollment);//

export default router;   