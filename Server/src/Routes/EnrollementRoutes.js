import { Router} from "express"
import { CourseEnrolledUser,
         Enrollement,
         GetEnrolledUser,
         EnrolledUserCourses,
         adminStats,
         deleteEnrollment
        }from "../Controller/EnrollementController.js";
 import VerifyUser from "../Middleware/AuthMiddleware.js";

const router = Router();


router.route("/EnrollUser").post(Enrollement);//VerifyUser,

router.route('/EnrolledUser').get(GetEnrolledUser);

router.route('/CourseEnrolledUser').get(CourseEnrolledUser);

router.route('/EnrolledCourses/:User_id').get(EnrolledUserCourses);  //VerifyUser,

router.route('/stats').get(adminStats);

router.route('/deleteEnrollment/:_id').delete(deleteEnrollment);

export default router;   