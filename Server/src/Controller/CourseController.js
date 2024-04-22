import { ApiError } from "../Utils/Errors.js";
import uploadFilesCloudinary from "../Utils/Cloudinary.js";
import { Course } from "../Models/CourseModel.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

export const AddCourse = async (req, res) => {
  const { Name, CourseId, Description, Level, Duration, Price } = req.body;

  // console.log(req.body);

  const fields = [Name, CourseId, Description, Level, Duration, Price];

  console.log(fields);

  if (fields.some((field) => field.trim(" ") === "")) {
    throw new ApiError(505, "all the fields are nessccary!");
  }
  console.log(req);
  console.log(req.files);
  const ThumbnailPath = req.files?.Thumbnail[0]?.path;
  console.log(ThumbnailPath);

  if (!ThumbnailPath) {
    return res.status(409).json(new ApiResponse(409, "thumbnail needed!"));
  }

  const StudyMaterialPath = req.files?.StudyMaterial[0]?.path;
  console.log(StudyMaterialPath);

  const Thumbnail = await uploadFilesCloudinary(ThumbnailPath);
  const StudyMaterial = await uploadFilesCloudinary(StudyMaterialPath);

  console.log(Thumbnail.secure_url);
  console.log("i love tits");
  console.log(Thumbnail.original_filename);
  console.log(StudyMaterial.secure_url);
  console.log(StudyMaterial.original_filename);

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
    console.log(CreatedCourse);
  } catch (error) {
    console.log(error);
    // in catch dlt the cloudinary files then send the error response 
    return res
      .status(500)
      .json(new ApiError(500, "Error while creating course in db", error));
  }

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
};

export const RemoveCourse = async (req, res) => {
  const {  CourseId } = req.params;

  console.log(CourseId)
try {
 
  const isCourseThere = await Course.findOne({_id : CourseId});
  console.log(isCourseThere)

    // here get the list of files first and remove them from the 
  // cloundinary then proceed to dlt the course

  if (!isCourseThere){
    throw new ApiError(505,{}, "no such Course is there ..")
  }
 
  const result = await Course.deleteOne({ _id: CourseId });

  if (result.deletedCount >! 0) {
    throw new ApiError(400, {}, "error while deleting the course") 
  }

  return res.status(200).json(new ApiResponse(200, {result}, "course has been deleted"));

} catch (error) {
  console.log(error)
  res.status(error.statuscode).json(new ApiResponse(error))
  
}
   


};

export const GetCourses = async (req, res) => {
  const Courses = await Course.find();

  if (!Courses) {
    throw new ApiError(404, "Error occured while fetching the data..");
  }
  // console.log(Courses);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        Courses,
        "Your all the Courses data has been fetched sucessfully!"
      )
    );
};

export const CoursesByLevel = async (req, res) => {
  const level = req.params.level;

  const Courses = await Course.find({ Level: level });

  console.log(Courses);

  if (Courses.length === 0) {
    return res
      .status(404)
      .json({ message: "No courses found for this level." });
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
};

export const UploadFiles = async (req, res) => {
  const { _id } = req.params;
  // console.log(req.body)
  
  // console.log(req.files);
  const studymaterial = req.files;

  console.log(studymaterial);
  
  const url = [];
  try {
    for (const files of studymaterial) {
      console.log(files.path);

      const { secure_url: FileName, original_filename: FileUrl } =
        await uploadFilesCloudinary(files?.path);
      // console.log(individualUrl);

      url.push({ FileName, FileUrl });
    }

    console.log("andar he apan filhal");
    console.log(url);
  } catch (error) {
    console.log(error)
    return res.status(error.statuscode?errorstatuscode:500)
    .json(new ApiResponse
      (error.statuscode?errorstatuscode:500,
        "error while file upload to cloud",
      error
    
    ))
  }
  console.log("aagye bahar");
  console.log(url);

  try {
    let updatedCourse = await Course.updateOne(
      { _id: _id },
      {
        $push: { StudyMaterial: { $each: url } },
      }
    ).exec(); 

    console.log(updatedCourse);
 
    if (updatedCourse.nModified === 0) {
      // return res.status(500);
      throw new ApiError(500,{updatedCourse},"not able to update with new data ...")
    } else {
      console.log("updated success")
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
    console.log(error);
    return res.status(error.statuscode).json(error)
  }
};

export const CourseByID = async (req, res) => {
  const _id = req.params._id;
  // console.log(_id)
  try {
    const CourseData = await Course.findById(_id);

    // console.log(CourseData)
    if (!CourseData) {
      new ApiError(500, "no Course avilable with this id");
    }
    res
      .status(200)
      .json(new ApiResponse(200, CourseData, "got course details.."));
  } catch (error) {
    new ApiError(500, "Error occured while fetching data", error);
  }
};

export const updatedCourse = async (req, res) => {
  // const updatedfileds = req.body.updatedfileds;
  // const _id = req.body._id;
  const { updatedfields, _id } = req.body;

  //   const _id = "65ebf7678d951c0d6db3e70c"
  // const updatedfileds = {
  //  Description : "Git chalaoge toh geet ki tarah contacts bana paaoge",
  //  CourseId :"Git with Geet"
  // }
  console.log(updatedfields);
  console.log(_id);
  console.log(req.body);
  // if(!_id || !updatedfileds){
  //   return res.status(400).json(new ApiResponse(400,"Plz provide the Course id or fieds that needed to be updated"))
  // }
  try {
    const Update = await Course.findByIdAndUpdate(
      _id,
      { $set: updatedfields },
      { new: true }
    );

    if (!Update) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Error while updatation"));
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, Update, "Course Details updated successfully")
      );
  } catch (error) {
    return res.status(400).json(new ApiResponse(500, "Updatation fails"));
  }
};

//   const { CourseId } = req.body;

//   const studyMaterial = req.files?.StudyMaterial[0]?.path;
//   const studyMaterial2 = req.files?.StudyMaterial[1]?.path;
//   console.log(studyMaterial2);
//   const cloud = await uploadFilesCloudinary(studyMaterial);

//   if (!cloud) {
//     throw new ApiError(500, "Error while files to the cloud :(  ", Error);
//   }

//   const UpdatedCourse = async (CourseId, cloud) => {
//     try {
//       const updatedCourse = await Course.findByIdAndUpdate(
//         CourseId,
//         { $push: { StudyMaterial: cloud.secure_url } },
//         { new: true }
//       );
//       if(updatedCourse === null){
//        return new ApiError(500,"no course with this is availabel")
//       }
//       return updatedCourse;
//     } catch (error) {
//        return  res.status(500)
//         .json(new ApiError(500,"error wile saving the data in db",Error))
//     }
//   };
//   const newUpdatedCourse = await UpdatedCourse(CourseId,cloud)

//   console.log(newUpdatedCourse)
//   return res.json(
//     new ApiResponse(200, newUpdatedCourse, "your files had been added :)")
//   );
// };
// const UpdatedCourse = await Course.findByIdAndUpdate(CourseId,{$push:{StudyMaterial : cloud}},{ new: true },(err, updatedDocument)=>{
//     if(err){
//         console.log(err)
//         throw new ApiError(500,"error occured while updating the files in db..",err)
//     }else{
//         console.log(updatedDocument)
//     }
// } )
// const studyMaterial = req.files?.StudyMaterial;

// const urls = [];
// studyMaterial.map((files)=>{
//     urls.add = uploadFilesCloudinary(files?.path)
// })

// lavdaya bata diya tune ki promises juthe hote h
//   Promise.all(studymaterial.map(async(files)=>{
//     console.log(files.path);
//     const individualUrl = await(uploadFilesCloudinary(files?.path))
//     console.log(individualUrl)
//     url.push(individualUrl)
// }))
// import stripe from "stripe";

// export const stripePayment = async(req,res)=>{
//   const {Name,Price} = req.body;
//   const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY)
// //   const paymentIntent = await stripeInstance.paymentIntents.create({
// //     amount: 1099,
// //     currency: 'usd',
// //     description: 'Software development services',
// //   });

// // const customer = await stripe.customers.create({
// //   name: 'Jenny Rosen',
// //   address: {
// //     line1: '510 Townsend St',
// //     postal_code: '98140',
// //     city: 'San Francisco',
// //     state: 'CA',
// //     country: 'US',
// //   },
// // });
//   const session = await stripeInstance.checkout.sessions.create({
//     payment_method_types :["card"],
//     line_items: [
//       {
//         price_data: {
//           currency: 'inr',
//           product_data: {
//             name:Name,
//             // images: [Course.url], // URL of the product image
//           },
//              unit_amount: Price * 100,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//   success_url: 'http://localhost:5173/Sucess',
//   cancel_url: 'http://localhost:5173/Courses',

//   })
//   res.json({id:session.id})
// }
