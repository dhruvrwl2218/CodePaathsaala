import React from "react";
import Form from "../../Components/Admin-Page-Components/Form";


const AddCourses = () =>{
  return(
    <Form/>
  )
}
export default AddCourses;



// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router";
// import axiosInstance from '../../utils/AxiosInstance';
// const AddCourses = () => {
//   const navigate = useNavigate();
//   const {
//     handleSubmit,
//     register,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const submitCourseDetails = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append("Name", data.Name);
//       formData.append("CourseId", data.CourseId);
//       formData.append("Price", data.Price);
//       formData.append("Duration", data.Duration);
//       formData.append("Thumbnail", data.Thumbnail[0]); // Assuming Thumbnail is a single file
//       formData.append("StudyMaterial", data.StudyMaterial[0]); // Assuming StudyMaterial is a single file
//       formData.append("Level", data.Level);
//       formData.append("Description", data.Description);
      
//       const res = await axiosInstance.post('Course/add',formData,{headers: { "Content-Type": "multipart/form-data" }})
//       toast.success("New Course Added");
//       reset();
//       navigate("/CourseList");
//     } catch (error) {
//       // console.log(error);
//       toast.error("Error while Adding Course!")
//     }
    
//   };

//   return (
//     <div className=" flex  w-3/5  rounded-xl bg-black text-white mx-8">
//       <div className="flex flex-col shadow-sm shadow-indigo-400">
//         <legend className="text-center text-4xl p-2 mx-16  font-semibold text-indigo-400 bg-neutral-800">
//           Add Course
//         </legend>
//         <form
//           className="flex flex-wrap my-12 mx-20 justify-center max-sm:mx-auto p-1"
//           onSubmit={handleSubmit(submitCourseDetails)}
//           encType="multipart/form-data"
//         >
//           <label className="block mb-5 w-1/2 text-xl max-sm:w-full text-indigo-500" htmlFor="">
//             Name :
//             <input
//               type="text"
//               className="block shadow-sm bg-neutral-800 text-neutral-300 mt-1  p-1 rounded-lg w-2/3 "
//               {...register("Name", { required: true })}
//             />
//           </label>

//           <label className="block mb-5 text-xl w-1/2 max-sm:w-full text-indigo-500">
//             CourseId :
//             <input
//               type="text"
//               className="block  bg-neutral-800 text-neutral-300 mt-1  p-1 rounded-lg w-2/3"
//               {...register("CourseId", { required: true })}
//             />
//           </label>

//           <label className="block mb-5 text-xl w-1/2 max-sm:w-full text-indigo-500">
//             Price
//             <input
//               type="text"
//               className="block  bg-neutral-800 text-neutral-300 mt-1 p-1 rounded-lg w-2/3"
//               {...register("Price", { required: true })}
//             />
//           </label>

//           <label className="block mb-5 text-xl w-1/2 max-sm:w-full text-indigo-500" htmlFor="">
//             Duration :
//             <input
//               type="text"
//               className="block  bg-neutral-800 text-neutral-300 mt-1 w-2/3  p-1 rounded-lg"
//               {...register("Duration")}
//             />
//           </label>

//           <label className="block mb-5 text-xl w-1/2 max-sm:w-full text-indigo-500" htmlFor="">
//             Thumbnail :
//             <input
//               type="File"
//               className="block  bg-neutral-800 text-neutral-300  mt-1 w-2/3  p-1 rounded-lg"
//               {...register("Thumbnail", { required: true })}
             
//             />
//           </label>

//           <label className="block mb-5 text-xl w-1/2 max-sm:w-full text-indigo-500" htmlFor="">
//             Files/pdf :
//             <input
//               type="File"
//               className="block  bg-neutral-800 text-neutral-300 mt-1 w-2/3  p-1 rounded-lg"
//               {...register("StudyMaterial")}
//               multiple
              
//             />
//           </label>
//           <label className="mb-5 block text-xl w-1/2 max-sm:w-full text-indigo-500">
//             Select Level :
//             <select
//               name="level"
//               id=""
//               {...register("Level")}
//               className=" mt-1 block w-2/3 p-1 rounded-lg  bg-neutral-800 text-neutral-300"
//             >
//               <option value="Beginner">Beginner</option>
//               <option value="Intermediate">Intermediate</option>
//               <option value="Advance">Advance</option>
//             </select>
//           </label>

//           <label className="block mb-12 text-xl w-1/2 max-sm:w-full text-indigo-600" htmlFor="discription">
//             Discription :
//             <textarea
//               name="Description"
//               id="Description"
//               cols="3"
//               rows="3"
//               className="block  mt-1 w-2/3  p-1 rounded-lg  bg-neutral-800 text-neutral-300"
//               {...register("Description", { required: true })}
//             ></textarea>
//           </label>
//           <input
//             type="submit"
//             className="m-2 text-xl  rounded-xl bg-indigo-600 p-2 w-1/3 max-sm:w-full "
//           />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddCourses;
