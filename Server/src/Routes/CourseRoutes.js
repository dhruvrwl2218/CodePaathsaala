 import { Router } from "express";
import { upload } from "../Middleware/MulterMiddleware.js";
import {
  AddCourse,
  RemoveCourse,
  GetCourses,
  CoursesByLevel,
  UploadFiles,
  CourseByID, 
  updatedCourse,
  // stripePayment
} from "../Controller/CourseController.js";

const router = Router();


//these routes are for admin so roles auth should also be added here so that only admin can access these routes

router.route("/add").post(
  upload.fields([
    {
      name: "Thumbnail",
    },
    {
      name: "StudyMaterial",
    },
  ]),  
  AddCourse
);

router.route("/remove").post(RemoveCourse);

router.route("/addFiles").put(
  upload.fields([
    {
      name : "StudyMaterial",
    }
    
  ]),UploadFiles
)

router.route("/ReadOne/:_id").get(CourseByID);

router.route("/UpdateCourse").put(updatedCourse)
//User Routes
router.route("/AllCourses").get(GetCourses);

router.route("/:level").get(CoursesByLevel);

// router.route("/checkout-session").post(stripePayment);








export default router;
