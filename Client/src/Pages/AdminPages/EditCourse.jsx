import React from 'react'
import Form from '../../Components/Admin-Page-Components/Form'

const EditCourse = () => {
  return (
    <div>
      <Form/>
    </div>
  )
}

export default EditCourse



// const editCourse = async (data) => {
 //   try {
      //     const res = await axiousInstance.patch(`Course/UpdateCourse/${_id}`,
      //       formData,
      //       {
      //             headers: { "Content-Type": "multipart/form-data" },
      //       }
      //     )
          
      //     if (res.status === 200) {
      //       toast.success("Course has been updated");
      //       reset();
      //       navigate("/CourseList");
      //     }
      //   } catch (error) {
      //     toast.error(error.message)
      //   }
      // };
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import { useNavigate, useParams } from "react-router";
// import axiousInstance from "../../utils/AxiosInstance";

// const EditCourse = () => {
//   const navigate = useNavigate();
//   const [fetchedcourse, setFetchedCourse] = useState();
//   const {
//     handleSubmit,
//     register,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const { _id } = useParams();

//   useEffect(() => {
//     const GetCoureseDetails = async () => {
//       try {
//         const res = await axiousInstance.get(`Course/ReadOne/${_id}`)
//         setFetchedCourse(res.data?.data);
//       } catch (error) {
//         toast.error(error.message)
//       }
//     };
//     GetCoureseDetails();
//   }, []);
//   useEffect(() => {
//     if (fetchedcourse) {
//       // Destructure fetchedCourse or trigger other actions
//       const { Name, CourseId, Price, Duration, Thumbnail, StudyMaterial, Level, Description } = fetchedcourse;
//       ("Setting Name:", setValue("Name", Name));
//       setValue("CourseId", CourseId);
//       setValue("Price", Price);
//       setValue("Duration", Duration);
//       setValue("Thumbnail", Thumbnail);
//       setValue("StudyMaterial", StudyMaterial);
//       setValue("Level", Level);
//       setValue("Description", Description);
//     }
//   }, [fetchedcourse]);

//   function findChangedKeys(obj1, obj2) {
//     const changedKeys = {};
   
//     for (const key in obj1) {
//       if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
//         if (obj1[key] !== obj2[key]) {
//           changedKeys[key] = obj1[key];
//         }
//       }
//     }
//     return changedKeys;
//   }

//   const editCourse = async (data) => {
//     const formData = new FormData();
//     const updatedFields = findChangedKeys(data, fetchedcourse);
    
//     delete updatedFields.StudyMaterial;

//    Object.keys(updatedFields).forEach((key)=>{
//     if(key === "Thumbnail"){
//       formData.append(key,updatedFields[key][0])
//     }else{
//       formData.append(key,updatedFields[key]);
//     }
   
//    })
    
//     try {
//       const res = await axiousInstance.patch(`Course/UpdateCourse/${_id}`,
//         formData,
//         {
//               headers: { "Content-Type": "multipart/form-data" },
//         }
//       )
      
//       if (res.status === 200) {
//         toast.success("Course has been updated");
//         reset();
//         navigate("/CourseList");
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   };

//   return (
//     <div className="flex  w-3/5  rounded-xl bg-black text-white mx-8">
//       <div className="flex flex-col shadow-sm shadow-indigo-400 ">
//         <legend className="text-center text-4xl p-2 mx-16  font-semibold text-indigo-400 bg-neutral-800">
//           Edit Course
//         </legend>
//         {fetchedcourse && (
//  <form
//  className="flex flex-wrap my-12 mx-20 justify-center max-sm:mx-auto p-1"
//  onSubmit={handleSubmit(editCourse)}
//  encType="multipart/form-data"
// >
//  <label className="block mb-5 w-1/2 text-xl max-sm:w-full text-indigo-500" htmlFor="">
//    Name :
//    <input
//      type="text"
//      className="block shadow-sm bg-neutral-800 text-neutral-300 mt-1  p-1 rounded-lg w-2/3 "
//      {...register("Name", { required: true })}
//    />
//  </label>

//  <label className="block mb-5 text-xl w-1/2 max-sm:w-full text-indigo-500">
//    CourseId :
//    <input
//      type="text"
//      className="block bg-neutral-800 text-neutral-300 mt-1  p-1 rounded-lg w-2/3"
//      {...register("CourseId", { required: true })}
//    />
//  </label>

//  <label className="block mb-5 text-xl w-1/2 max-sm:w-full text-indigo-500">
//    Price :
//    <input
//      type="text"
//      className="block  bg-neutral-800 text-neutral-300 mt-1 p-1 rounded-lg w-2/3"
//      {...register("Price", { required: true })}
//    />
//  </label>

//  <label className="block mb-5 text-xl w-1/2 max-sm:w-full text-indigo-500" htmlFor="">
//    Duration :
//    <input
//      type="text"
//      className="block  bg-neutral-800 text-neutral-300 mt-1 w-2/3  p-1 rounded-lg"
//      {...register("Duration")}
//    />
//  </label>

//  <label className="block mb-5 text-xl w-1/2 max-sm:w-full text-indigo-500" htmlFor="">
//    Thumbnail :
//    <input
//      type="File"
//      className="block  bg-neutral-800 text-neutral-300  mt-1 w-2/3  p-1 rounded-lg"
//      {...register("Thumbnail")}
//    />
//  </label>

//  <label className="block mb-5 text-xl w-1/2 max-sm:w-full text-indigo-500" htmlFor="">
//    Files/pdf :
//    <input
//      type="File"
//      className="block  bg-neutral-800 text-neutral-300 mt-1 w-2/3  p-1 rounded-lg"
//      {...register("StudyMaterial")}
//      multiple
//    />
//  </label>
//  <label className="mb-5 block text-xl w-1/2 max-sm:w-full text-indigo-500">
//    Select Level :
//    <select
//      name="level"
//      id=""
//      {...register("Level")}
//      className=" mt-1 block w-2/3 p-1 rounded-lg  bg-neutral-800 text-neutral-300 "
//    >
//      <option value="Beginner">Beginner</option>
//      <option value="Intermediate">Intermediate</option>
//      <option value="Advance">Advance</option>
//    </select>
//  </label>

//  <label className="block mb-12 text-xl w-1/2 max-sm:w-full text-indigo-600" htmlFor="discription">
//    Discription :
//    <textarea
//      name="Description"
//      id="Description"
//      cols="3"
//      rows="3"
//      className="block  mt-1 w-2/3  p-1 rounded-lg  bg-neutral-800 text-neutral-300"
//      {...register("Description", { required: true })}
//    ></textarea>
//  </label>
//  <input
//    type="submit"
//    className="m-2 text-xl rounded-xl bg-indigo-600 p-2 w-1/3 max-sm:w-full"
//  />
// </form>
// )}
//       </div>
//     </div>
//   );
// };

// export default EditCourse;
