import { Router} from "express"
import { CourseEnrolledUser,
         GetEnrolledUser,
         EnrolledUserCourses,
         deleteEnrollment,
         getKey,
         checkout,
         paymentverificationandEnrollment
        }from "../Controller/EnrollementController.js";
 import VerifyUser from "../Middleware/AuthMiddleware.js";

const router = Router();

router.route("/getkey").post(getKey);

router.route("/checkout").post(checkout);

router.route("/paymentVerification").post(paymentverificationandEnrollment);//VerifyUser,

router.route('/EnrolledUser').get(GetEnrolledUser);

router.route('/CourseEnrolledUser').get(CourseEnrolledUser);

router.route('/EnrolledCourses/:User_id').get(VerifyUser,EnrolledUserCourses);  
 
router.route('/deleteEnrollment/:_id').delete(deleteEnrollment);

export default router;   