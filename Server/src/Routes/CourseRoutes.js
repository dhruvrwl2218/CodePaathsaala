import { Router } from "express";
import { upload } from "../Middleware/MulterMiddleware.js";
import VerifyUser from "../Middleware/AuthMiddleware.js";
import IsAdmin from "../Middleware/IsAdminMiddleware.js";
import {
  AddCourse,
  RemoveCourse,
  GetCourses,
  CoursesByLevel,
  UploadFiles,
  CourseByID,
  updatedCourse,
} from "../Controller/CourseController.js";

const router = Router();

//these routes are for admin so roles auth should also be added here so that only admin can access these routes

router.route("/add").post(
  VerifyUser,
  IsAdmin,
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

router.route("/remove/:CourseId").delete(VerifyUser, IsAdmin, RemoveCourse);

router
  .route("/addFiles/:_id")
  .put(VerifyUser, IsAdmin, upload.array("StudyMaterial", 5), UploadFiles);

router.route("/ReadOne/:_id").get(CourseByID);

router
  .route("/UpdateCourse/:_id")
  .patch(VerifyUser, IsAdmin, upload.single("Thumbnail"), updatedCourse);

//User Routes
router.route("/AllCourses").get(GetCourses);

router.route("/:level").get(CoursesByLevel);

export default router;
