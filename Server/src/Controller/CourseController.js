import { ApiError } from "../Utils/Errors.js";
import uploadFilesCloudinary from "../Utils/Cloudinary.js";
import { Course } from "../Models/CourseModel.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Enroll } from "../Models/EnrollementModel.js";
import mongoTransaction from "../Utils/Transaction.js";
import deleteCloudinaryFile from "../Utils/DeleteCloudFiles.js";

export const AddCourse = async (req, res) => {
  // console.log(req.files)
  const { Name, CourseId, Description, Level, Duration, Price } = req.body;

  const fields = [Name, CourseId, Description, Level, Duration, Price];

  if (fields.some((field) => field.trim(" ") === "")) {
    throw new ApiError(505, "all the fields are nessccary!");
  }

  const ThumbnailPath = req.files?.Thumbnail[0]?.path;

  if (!ThumbnailPath) {
    return res.status(409).json(new ApiResponse(409, "thumbnail needed!"));
  }

  const StudyMaterialPath = req.files?.StudyMaterial[0]?.path;

  const Thumbnail = await uploadFilesCloudinary(ThumbnailPath);
  const StudyMaterial = await uploadFilesCloudinary(StudyMaterialPath);

  let CreatedCourse;

  try {
    CreatedCourse = await Course.create({
      Name,
      CourseId,
      Description,
      Level,
      Duration,
      Price,
      Thumbnail: Thumbnail.secure_url,
      StudyMaterial: {
        FileName: StudyMaterial.original_filename,
        FileUrl: StudyMaterial.secure_url,
      },
    });
    if (!CreatedCourse) {
      throw new ApiError(400, "error while saving the data in db", Error);
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          CreatedCourse,
          "Course has been registerd in db successfully!;)"
        )
      );
  } catch (error) {
    // console.log(error);
    // in catch dlt the cloudinary files then send the error response
    return res
      .status(error.statuscode ? error.statuscode : 500)
      .json(new ApiError(500, "Error while creating course in db", error));
  }
};

export const RemoveCourse = async (req, res) => {
  const { CourseId } = req.params;

  // transactional way for atomicity
  const transactionalDeletion = async (session) => {
    const course = await Course.findById({ _id: CourseId }).session(session);

    if (!course) {
      throw new ApiError(500, "Course not Found");
    }

    await Enroll.deleteMany({ Course: CourseId }).session(session);

    const courseDeleteResult = await Course.deleteOne({
      _id: CourseId,
    }).session(session);

    if (!courseDeleteResult) {
      throw new ApiError(500, "failed to dlt the course");
    }
    return course;
  };
  try {
    const course = await mongoTransaction(transactionalDeletion);
    res.status(200).json(new ApiResponse(200, {}, "Course Deleted"));
    // get back to this & learn about the bg jobs or try to use redis for deletion of cloud files ...
    //   (async ()=>{
    //   const fileUrls = [
    //     course.Thumbnail,
    //     ...course.StudyMaterial.map(material => material.FileUrl)
    //   ]
    //   await Promise.all(fileUrls.map(async (url) =>{
    //     try {
    //       await deleteCloudinaryFile(url);
    //     } catch (bgerror) {
    //       console.log(bgerror)
    //     }
    //   }))
    // })
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const GetCourses = async (req, res) => {
  try {
    const Courses = await Course.find();

    if (!Courses) {
      throw new ApiError(404, "Error occured while fetching the data..");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          Courses,
          "Your all the Courses data has been fetched sucessfully!"
        )
      );
  } catch (error) {
    // console.log(error);
    res.status(error.statuscode ? error.statuscode : 400).json(error);
  }
};

export const CoursesByLevel = async (req, res) => {
  const level = req.params.level;
  try {
    const Courses = await Course.find({ Level: level });

    if (Courses.length === 0) {
      throw new ApiError(404, "No courses found for this level.");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "data for this level has been fetched successfully ! :) ",
          Courses
        )
      );
  } catch (error) {
    console.log(error);
    res.status(error.statuscode).json(error.message);
  }
};

export const UploadFiles = async (req, res) => {
  const { _id } = req.params;

  const studymaterial = req.files;

  if (studymaterial.length < 0) {
    throw new ApiError(409, "havem't recieved the files");
  }

  console.log(_id, studymaterial);
  const url = [];

  try {
    for (const files of studymaterial) {
      const { secure_url: FileUrl, original_filename: FileName } =
        await uploadFilesCloudinary(files?.path);
      url.push({ FileName, FileUrl });
    }
  } catch (error) {
    // console.log(error)
    return res
      .status(error.statuscode ? errorstatuscode : 500)
      .json(
        new ApiResponse(
          error.statuscode ? errorstatuscode : 500,
          "error while file upload to cloud",
          error
        )
      );
  }

  try {
    let updatedCourse = await Course.updateOne(
      { _id: _id },
      {
        $push: { StudyMaterial: { $each: url } },
      }
    ).exec();

    if (updatedCourse.nModified === 0) {
      throw new ApiError(
        500,
        { updatedCourse },
        "not able to update with new data ..."
      );
    } else {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedCourse,
            "your all files have been uploaded successfully !"
          )
        );
    }
  } catch (error) {
    // console.log(error);
    return res.status(error.statuscode).json(error);
  }
};

export const CourseByID = async (req, res) => {
  const _id = req.params._id;

  try {
    const CourseData = await Course.findById(_id);

    if (!CourseData) {
      throw new ApiError(500, "no Course avilable with this id");
    }
    res
      .status(200)
      .json(new ApiResponse(200, CourseData, "got course details.."));
  } catch (error) {
    res
      .status(error.statuscode ? error.statuscode : 500)
      .json(new ApiResponse(500, "Error occured while fetching data", error));
  }
};

export const updatedCourse = async (req, res) => {
  const updateCourseInfo = req.body;
  const _id = req.params._id;

  const ThumbnailPath = req.file?.path;

  console.log(ThumbnailPath);
  //in case of thumbnail change first dlt the img earlier saved in the cloud by getting its url from the db then upload a new one

  if (ThumbnailPath) {
    let { secure_url } = await uploadFilesCloudinary(ThumbnailPath);
    updateCourseInfo.Thumbnail = secure_url;
  }

  if (!updateCourseInfo) {
    return res
      .status(403)
      .json(
        new ApiResponse(403, " you haven't given any updated data to update")
      );
  }
  try {
    const Update = await Course.findByIdAndUpdate(
      _id,
      { $set: updateCourseInfo },
      { new: true }
    );

    // if (!Update) {
    //   return res.status(400);
    //   // .json(new ApiResponse(400, "Error while updatation"));
    //   throw new ApiError(400, Update, "Error while updatation");
    // }
    // console.log(Update);
    res
      .status(200)
      .json(
        new ApiResponse(200, Update, "Course Details updated successfully")
      );
  } catch (error) {
    // console.log(error);
    return res
      .status(error.statusocde ? error.statuscode : 500)
      .json(
        new ApiResponse(
          error.statusocde ? error.statuscode : 500,
          "Updatation fails",
          error
        )
      );
  }
};

// try {
// here leran about the transactions in mongo db to maintian the atomacity around your db
// changes to be done
//   const enrollmentdelete = await Enroll.deleteMany({Course : CourseId})

//   if(!enrollmentdelete){
//     console.log("there weere no enrollments or may be enable to delete them")
//   }

//   const isCourseThere = await Course.findOne({ _id: CourseId });

//   if (!isCourseThere) {
//     throw new ApiError(505, {}, "no such Course is there ..");
//   }

//   const result = await Course.deleteOne({ _id: CourseId });

//   if (result.deletedCount > !0) {
//     throw new ApiError(400, {}, "error while deleting the course");
//   }
//   return res
//     .status(200)
//     .json(new ApiResponse(200, { result }, "course has been deleted"));
// } catch (error) {
//   // console.log(error);
//   res
//     .status(error.statuscode ? error.statuscode : 500)
//     .json(new ApiResponse(error));

// }
