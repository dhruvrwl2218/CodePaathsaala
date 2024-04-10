import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

const EditCourse = () => {
  const navigate = useNavigate();
  const [fetchedcourse, setFetchedCourse] = useState();
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const { _id } = useParams();

  useEffect(() => {
    const GetCoureseDetails = async () => {
      try {
        console.log(_id); 
        const res = await axios.get(
          `http://localhost:8000/api/v1/Course/ReadOne/${_id}`,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        //  console.log(res);
        //  console.log(res.data)
        setFetchedCourse(res.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    GetCoureseDetails();
  }, []);
  useEffect(() => {
    console.log('in 2 UE')
    console.log(fetchedcourse)
    if (fetchedcourse) {
      // Destructure fetchedCourse or trigger other actions
      const { Name, CourseId, Price, Duration, Thumbnail, StudyMaterial, Level, Description } = fetchedcourse;
      console.log("Setting Name:", setValue("Name", Name));
      setValue("CourseId", CourseId);
      setValue("Price", Price);
      setValue("Duration", Duration);
      setValue("Thumbnail", Thumbnail);
      setValue("StudyMaterial", StudyMaterial);
      setValue("Level", Level);
      setValue("Description", Description);
    }
  }, [fetchedcourse]);
  function findChangedKeys(obj1, obj2) {
    const changedKeys = {};

    for (const key in obj1) {
      if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        if (obj1[key] !== obj2[key]) {
          changedKeys[key] = obj1[key];
        }
      }
    }
    return changedKeys;
  }

  const submitCourseDetails = async (data) => {
    // console.log(data)
    // console.log(fetchedcourse)
    const updatedFields = findChangedKeys(data, fetchedcourse);
    console.log(updatedFields);

    const dataa = {
      _id,
      updatedFields,
    };

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/CourseUpdateCourse",
        dataa,
        { withCredentials: true }
      );
      console.log(res);
      if (res.status === 200) {
        toast.success("Course has been updated");
        reset();
        navigate("/CourseList");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-2 flex  w-3/5 ml-5 rounded-xl bg-neutral-900 text-white">
      <div className="flex flex-col ">
        <legend className="text-center text-3xl p-2 my-2 font-bold">
          Edit Course
        </legend>
        {fetchedcourse && (
 <form
 className="flex flex-wrap my-12 mx-20 justify-center max-sm:mx-auto p-1"
 onSubmit={handleSubmit(submitCourseDetails)}
 encType="multipart/form-data"
>
 <label className="block mb-5 w-1/2 text-xl max-sm:w-full " htmlFor="">
   Name :
   <input
     type="text"
     className="block bg-neutral-800 text-neutral-300  mt-1  p-1 rounded-lg w-2/3"
     {...register("Name", { required: true })}
   />
 </label>

 <label className="block mb-5 text-xl w-1/2 max-sm:w-full">
   CourseId :
   <input
     type="text"
     className="block border bg-neutral-800 text-neutral-300  mt-1  p-1 rounded-lg w-2/3"
     {...register("CourseId", { required: true })}
   />
 </label>

 <label className="block mb-5 text-xl w-1/2 max-sm:w-full">
   Price
   <input
     type="text"
     className="block border bg-neutral-800 text-neutral-300 mt-1 p-1 rounded-lg w-2/3"
     {...register("Price", { required: true })}
   />
 </label>

 <label className="block mb-5 text-xl w-1/2 max-sm:w-full" htmlFor="">
   Duration :
   <input
     type="text"
     className="block border bg-neutral-800 text-neutral-300 mt-1 w-2/3  p-1 rounded-lg"
     {...register("Duration")}
   />
 </label>

 <label className="block mb-5 text-xl w-1/2 max-sm:w-full" htmlFor="">
   Thumbnail :
   <input
     type="File"
     className="block border bg-neutral-800 text-neutral-300 mt-1 w-2/3  p-1 rounded-lg"
     {...register("Thumbnail", { required: true })}
     // onChange={(e) => {
     //   // Handle file selection and update form value
     //   if (e.target.files.length > 0) {
     //     setValue('Thumbnail', e.target.files[0]);
     //   }
     // }}
   />
 </label>

 <label className="block mb-5 text-xl w-1/2 max-sm:w-full" htmlFor="">
   Files/pdf :
   <input
     type="File"
     className="block border bg-neutral-800 text-neutral-300 mt-1 w-2/3  p-1 rounded-lg"
     {...register("StudyMaterial")}
     multiple
     // onChange={(e) => {   , { required: true }
     //   // Handle file selection and update form value
     //   if (e.target.files.length > 0) {
     //     setValue("StudyMaterial", e.target.files[0]);
     //   }
     // }}
   />
 </label>
 <label className="mb-5 block text-xl w-1/2 max-sm:w-full">
   Select Level :
   <select
     name="level"
     id=""
     {...register("Level")}
     className=" mt-1 block w-2/3 p-1 rounded-lg bg-neutral-800 text-neutral-300"
   >
     <option value="Beginner">Beginner</option>
     <option value="Intermediate">Intermediate</option>
     <option value="Advance">Advance</option>
   </select>
 </label>

 <label className="block mb-12 text-xl w-1/2 max-sm:w-full" htmlFor="discription">
   Discription :
   <textarea
     name="Description"
     id="Description"
     cols="3"
     rows="3"
     className="block border  mt-1 w-2/3  p-1 rounded-lg bg-neutral-800 text-neutral-300"
     {...register("Description", { required: true })}
   ></textarea>
 </label>
 <input
   type="submit"
   className="border m-2 text-xl  rounded-xl bg-blue-500 p-2 w-1/3 max-sm:w-full"
 />
</form>
)}
        
      </div>
    </div>
  );
};

export default EditCourse;

// const submitCourseDetails = async (data) => {
//   try {

//     const formData = new FormData();
// formData.append("Name", data.Name);
// formData.append("CourseId", data.CourseId);
// formData.append("Price", data.Price);
// formData.append("Duration", data.Duration);
// formData.append("Thumbnail", data.Thumbnail[0]); // Assuming Thumbnail is a single file
// formData.append("StudyMaterial", data.StudyMaterial[0]); // Assuming StudyMaterial is a single file
// formData.append("Level", data.Level);
// formData.append("Description", data.Description);

//     const res = await axios.post(
//       "http://localhost:8000/api/v1/Course/add",
//       formData,
//       { withCredentials: true,headers: { 'Content-Type': 'multipart/form-data' } }
//     );
//     toast.success("New Course is made")
//     reset();
//     navigate("/CourseList")
//   } catch (error) {
//     console.log(error)
//   }
//   console.log(data)
// };


{/* <div className=" bg-black text-white">
      <div>
        <h2>ADMIN SECTION</h2>
      </div>

      <div className="m-5 p-20 border-2 w-1/2 rounded-3xl">
        <legend className="text-2xl ">Edit Course</legend>
        <form
          className=""
          onSubmit={handleSubmit(submitCourseDetails)}
          encType="multipart/form-data"
        >
          <label className="block mb-2 text-lg" htmlFor="">
            Name :
            <input
              type="text"
              className="block border text-black mt-1 w-2/3 p-2 rounded-lg"
              {...register("Name", { required: true })}
            />
          </label>

          <label className="block mb-2 text-lg">
            CourseId :
            <input
              type="text"
              className="block border text-black mt-1 w-2/3 p-2 rounded-lg"
              {...register("CourseId", { required: true })}
            />
          </label>

          <label className="block mb-2 text-lg">
            Price
            <input
              type="text"
              className="block border text-black mt-1 w-2/3  p-2 rounded-lg"
              {...register("Price", { required: true })}
            />
          </label>

          <label className="block mb-2 text-lg" htmlFor="">
            Duration :
            <input
              type="text"
              className="block border text-black mt-1 w-2/3  p-2 rounded-lg"
              {...register("Duration")}
            />
          </label>

          <label className="block mb-2 text-lg" htmlFor="">
            Thumbnail :
            <input
              type="File"
              className="block border text-black mt-1 w-2/3  p-2 rounded-lg"
              {...register("Thumbnail")}
            />
          </label>

          <label className="block mb-2 text-lg" htmlFor="">
            Files/pdf :
            <input
              type="File"
              className="block border text-black mt-1 w-2/3  p-2 rounded-lg"
              {...register("StudyMaterial")}
              multiple
            />
          </label>
          <label className="mb-2 block text-lg">
            Select Level :
            <select
              name="level"
              id=""
              {...register("Level")}
              className="text-black mt-1 block w-2/3 p-2 rounded-lg"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advance">Advance</option>
            </select>
          </label>

          <label className="block mb-2 text-lg" htmlFor="discription">
            Discription :
            <textarea
              name="Description"
              id="Description"
              cols="30"
              rows="10"
              className="block border text-black mt-1 w-2/3  p-2 rounded-lg"
              {...register("Description", { required: true })}
            ></textarea>
          </label>

          <input type="submit" className="border p-2 m-2 rounded-xl w-60 " />
        </form>
      </div>
    </div> */}