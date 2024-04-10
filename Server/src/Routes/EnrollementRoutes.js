import { Router} from "express"
import { CourseEnrolledUser,
         Enrollement,
         GetEnrolledUser,
         EnrolledUserCourses
        }from "../Controller/EnrollementController.js";
// import VerifyUser from "../Middleware/AuthMiddleware.js";

const router = Router();


router.route("/EnrollUser").post(Enrollement);

router.route('/EnrolledUser').get(GetEnrolledUser);

router.route('/CourseEnrolledUser').get(CourseEnrolledUser);

router.route('/EnrolledCourses/:User_id').get(EnrolledUserCourses);



export default router; 