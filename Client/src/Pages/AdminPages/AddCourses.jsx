import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const AddCourses = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const submitCourseDetails = async (data) => {
    try {
      const formData = new FormData();
      formData.append("Name", data.Name);
      formData.append("CourseId", data.CourseId);
      formData.append("Price", data.Price);
      formData.append("Duration", data.Duration);
      formData.append("Thumbnail", data.Thumbnail[0]); // Assuming Thumbnail is a single file
      formData.append("StudyMaterial", data.StudyMaterial[0]); // Assuming StudyMaterial is a single file
      formData.append("Level", data.Level);
      formData.append("Description", data.Description);

      const res = await axios.post(
        "http://localhost:8000/api/v1/Course/add",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("New Course Added");
      reset();
      navigate("/CourseList");
    } catch (error) {
      console.log(error);
      toast.error("Error while Adding Course!")
    }
    console.log(data);
  };

  return (
    <div className="border-2 flex  w-3/5 ml-5 rounded-xl bg-black text-white">
      <div className="flex flex-col ">
        <legend className="text-center text-3xl p-2 my-2 font-bold">
          Add Course
        </legend>
        <form
          className="flex flex-wrap my-12 mx-20 justify-center max-sm:mx-auto p-1"
          onSubmit={handleSubmit(submitCourseDetails)}
          encType="multipart/form-data"
        >
          <label className="block mb-5 w-1/2 text-xl max-sm:w-full " htmlFor="">
            Name :
            <input
              type="text"
              className="block shadow-sm bg-neutral-800 text-neutral-300 mt-1  p-1 rounded-lg w-2/3 "
              {...register("Name", { required: true })}
            />
          </label>

          <label className="block mb-5 text-xl w-1/2 max-sm:w-full">
            CourseId :
            <input
              type="text"
              className="block  bg-neutral-800 text-neutral-300 mt-1  p-1 rounded-lg w-2/3"
              {...register("CourseId", { required: true })}
            />
          </label>

          <label className="block mb-5 text-xl w-1/2 max-sm:w-full">
            Price
            <input
              type="text"
              className="block  bg-neutral-800 text-neutral-300 mt-1 p-1 rounded-lg w-2/3"
              {...register("Price", { required: true })}
            />
          </label>

          <label className="block mb-5 text-xl w-1/2 max-sm:w-full" htmlFor="">
            Duration :
            <input
              type="text"
              className="block  bg-neutral-800 text-neutral-300 mt-1 w-2/3  p-1 rounded-lg"
              {...register("Duration")}
            />
          </label>

          <label className="block mb-5 text-xl w-1/2 max-sm:w-full" htmlFor="">
            Thumbnail :
            <input
              type="File"
              className="block  bg-neutral-800 text-neutral-300  mt-1 w-2/3  p-1 rounded-lg"
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
              className="block  bg-neutral-800 text-neutral-300 mt-1 w-2/3  p-1 rounded-lg"
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
              className=" mt-1 block w-2/3 p-1 rounded-lg  bg-neutral-800 text-neutral-300"
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
              className="block border  mt-1 w-2/3  p-1 rounded-lg  bg-neutral-800 text-neutral-300"
              {...register("Description", { required: true })}
            ></textarea>
          </label>
          <input
            type="submit"
            className="border m-2 text-xl  rounded-xl bg-blue-500 p-2 w-1/3 max-sm:w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default AddCourses;
