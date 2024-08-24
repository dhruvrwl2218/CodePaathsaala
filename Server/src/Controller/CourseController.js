import { ApiError } from "../Utils/Errors.js";
import uploadFilesCloudinary from "../Utils/Cloudinary.js";
import { Course } from "../Models/CourseModel.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Enroll } from "../Models/EnrollementModel.js";
import mongoTransaction from "../Utils/Transaction.js";
import deleteCloudinaryFile from "../Utils/DeleteCloudFiles.js";

export const AddCourse = async (req, res) => {
  
  const { Name, CourseId, Description, Level, Duration, Price } = req.body;

  const fields = [Name, CourseId, Description, Level, Duration, Price];

  if (fields.some((field) => field.trim(" ") === "")) {
    return res.status(409).json(new ApiResponse(409,{},"all fields are required"))
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
      throw new ApiError(500, "Internal server Error");
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
    const statuscode = error.statuscode || 500;
    return res
      .status(statuscode)
      .json(new ApiResponse(statuscode,{},error.message || "Error while Creating Course"));
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
    const statuscode = error.statuscode || 500
    res.status(statuscode).json(new ApiResponse(statuscode,{},"Error while deleting course"));
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
    const stauscode = error.statuscode || 404
    res.status(stauscode).json(new ApiResponse(404,{},error.message || "not able to get course"));
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
    res.status(409).json(new ApiResponse(409,{},"Plz send files to upload!"))
    // throw new ApiError(409, "haven't recieved the files");
  }
  const url = [];

  try {
    for (const files of studymaterial) {
      const { secure_url: FileUrl, original_filename: FileName } =
        await uploadFilesCloudinary(files?.path);
      url.push({ FileName, FileUrl });
    }
  } catch (error) {
    // console.log(error)
    const statuscode = error.statuscode || 500;
    return res
      .status(statuscode)
      .json(
        new ApiResponse(
          statuscode,{},
          "error while uploading files",
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
      //here before throwing the error first revert the file upload i.e dlt the files from cloud you can do that in background
      throw new ApiError(
        500,
        {},
        "not able complete the upload"
      );
    } else {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedCourse,
            "files been added!"
          )
        );
    }
  } catch (error) {
    const statuscode = error.statuscode || 500;
    return res.status(statuscode).json(new ApiResponse(statuscode,{},error.message || "can't complete the request!"));
  }
};

export const CourseByID = async (req, res) => {
  const _id = req.params._id;

  try {
    const CourseData = await Course.findById(_id);

    if (!CourseData) {
      throw new ApiError(500, "can't find the course :(");
    }
    res
      .status(200)
      .json(new ApiResponse(200, CourseData, "got course details.."));
  } catch (error) {
    const statuscode = error.statuscode || 500
    res
      .status(statuscode)
      .json(new ApiResponse(statuscode,{},error.message || "error while fetching course!",))
  }
};

export const updatedCourse = async (req, res) => {
  const updateCourseInfo = req.body;
  const _id = req.params._id;

  const ThumbnailPath = req.file?.path;

  // console.log(ThumbnailPath);
  //in case of thumbnail change first dlt the img earlier saved in the cloud by getting its url from the db then upload a new one

  if (ThumbnailPath) {
    let { secure_url } = await uploadFilesCloudinary(ThumbnailPath);
    updateCourseInfo.Thumbnail = secure_url;
  }

  if (!updateCourseInfo) {
    return res
      .status(403)
      .json(
        new ApiResponse(403,{}, " you haven't given any updated data to update")
      );
  }
  try {
    const Update = await Course.findByIdAndUpdate(
      _id,
      { $set: updateCourseInfo },
      { new: true }
    );
    res
      .status(200)
      .json(
        new ApiResponse(200, Update, "Course Details updated successfully")
      );
  } catch (error) {
    const statuscode = error.statuscode || 500;
    return res
      .status(statuscode)
      .json(
        new ApiResponse(
           statuscode,
           {},
          "Updatation fails",
        )
      );
  }
};

