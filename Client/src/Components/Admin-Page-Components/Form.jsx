import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import axiosInstance from "../../utils/AxiosInstance";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../../utils/CoursevalidationSchema";
import { useLocation } from "react-router-dom";

const Form = () => {
  const [isEdit, setIsEdit] = useState();
  const [fetchedCourse, setFetchedCourse] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const { _id } = useParams();
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { dirtyFields, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const GetCoureseDetails = async (_id) => {
      try {
        const res = await axiosInstance.get(`Course/ReadOne/${_id}`);
        setFetchedCourse(res);
      } catch (error) {
        console.log('fetching course for edit error:',error);
      }
    };
    if (location.pathname !== "/AddCourses") {
      setIsEdit(true);
      GetCoureseDetails(_id);
    }
  }, []);

  useEffect(() => {
    if (fetchedCourse) {
      reset({
        Name: fetchedCourse.Name,
        CourseId: fetchedCourse.CourseId || "",
        Price: fetchedCourse.Price,
        Duration: fetchedCourse.Duration,
        Thumbnail: "",
        Level: fetchedCourse.Level,
        Description: fetchedCourse.Description,
        StudyMaterial: "",
      });
    }
  }, [fetchedCourse, reset]);

  const Submit = async (data) => {
    const formData = new FormData();

    if (isEdit) {
      Object.keys(dirtyFields).map((key) => {
        if (key === "Thumbnail") {
          formData.append(key, getValues(key)[0]);
        } else {
          formData.append(key, getValues(key));
        }
      });
      try {
        const res = await axiosInstance.patch(
          `Course/UpdateCourse/${_id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
          reset();
          navigate("/CourseList");
      } catch (error) {
        console.log('edit/add form error :',error)
      }
    } else {
      formData.append("Name", data.Name);
      formData.append("CourseId", data.CourseId);
      formData.append("Price", data.Price);
      formData.append("Duration", data.Duration);
      formData.append("Thumbnail", data.Thumbnail[0]); // Assuming Thumbnail is a single file
      formData.append("Level", data.Level);
      formData.append("Description", data.Description);
      formData.append("StudyMaterial", data.StudyMaterial[0]); // Assuming StudyMaterial is a single file
      // if (data.StudyMaterials && data.StudyMaterials.length > 0) {
      //   Array.from(data.StudyMaterials).forEach((file) => {
      //     formData.append("StudyMaterials[]", file);
      //   });
      // }
      try {
        const res = await axiosInstance.post("Course/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        reset();
        navigate("/CourseList");
      } catch (error) {
        console.log(error);
      }
      } 
    }   
  return (
    <div className="flex w-3/5 rounded-xl bg-black text-white mx-8">
      <div className="flex flex-col shadow-sm shadow-indigo-400 ">
        <legend className="text-center text-4xl p-2 mx-16  font-semibold text-indigo-400 bg-neutral-800">
          {isEdit ? "Edit Course" : "Add Course"}
        </legend>
        {
          <form
            className="flex flex-wrap my-12 mx-20 justify-center max-sm:mx-auto p-1"
            onSubmit={handleSubmit(Submit)}
            encType="multipart/form-data"
          >
            <label
              className="block mb-5 w-1/2 text-xl max-sm:w-full text-indigo-500"
              htmlFor=""
            >
              Name :
              <input
                type="text"
                className="block shadow-sm bg-neutral-800 text-neutral-300 mt-1  p-1 rounded-lg w-2/3 "
                {...register("Name", { required: true })}
              />
            </label>

            <label className="block mb-5 text-xl w-1/2 max-sm:w-full text-indigo-500">
              CourseId :
              <input
                type="text"
                className="block bg-neutral-800 text-neutral-300 mt-1  p-1 rounded-lg w-2/3"
                {...register("CourseId", { required: true })}
              />
            </label>

            <label className="block mb-5 text-xl w-1/2 max-sm:w-full text-indigo-500">
              Price :
              <input
                type="text"
                className="block  bg-neutral-800 text-neutral-300 mt-1 p-1 rounded-lg w-2/3"
                {...register("Price", { required: true })}
              />
            </label>

            <label
              className="block mb-5 text-xl w-1/2 max-sm:w-full text-indigo-500"
              htmlFor=""
            >
              Duration :
              <input
                type="text"
                className="block  bg-neutral-800 text-neutral-300 mt-1 w-2/3  p-1 rounded-lg"
                {...register("Duration")}
              />
            </label>

            <label
              className="block mb-5 text-xl w-1/2 max-sm:w-full text-indigo-500"
              htmlFor=""
            >
              Thumbnail :
              <input
                type="file"
                className="block  bg-neutral-800 text-neutral-300  mt-1 w-2/3  p-1 rounded-lg"
                {...register("Thumbnail")}
              />
            </label>

            <label
              className="block mb-5 text-xl w-1/2 max-sm:w-full text-indigo-500"
              htmlFor=""
            >
              Video/pdf Lectures :
              <input
                type="file"
                className="block  bg-neutral-800 text-neutral-300 mt-1 w-2/3  p-1 rounded-lg"
                {...register("StudyMaterial")}
                disabled={isEdit && true}
                multiple
              />
            </label>
            <label className="mb-5 block text-xl w-1/2 max-sm:w-full text-indigo-500">
              Select Level :
              <select
                name="level"
                id=""
                {...register("Level")}
                className=" mt-1 block w-2/3 p-1 rounded-lg  bg-neutral-800 text-neutral-300 "
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advance">Advance</option>
              </select>
            </label>

            <label
              className="block mb-12 text-xl w-1/2 max-sm:w-full text-indigo-600"
              htmlFor="discription"
            >
              Discription :
              <textarea
                name="Description"
                id="Description"
                cols="3"
                rows="3"
                className="block  mt-1 w-2/3  p-1 rounded-lg  bg-neutral-800 text-neutral-300"
                {...register("Description", { required: true })}
              ></textarea>
            </label>
            <input
              type="submit"
              className="m-2 text-xl rounded-xl bg-indigo-600 p-2 w-1/3 max-sm:w-full"
            />
            <div className="w-full text-xs">
              {Object.keys(errors).length > 0 && (
                <div className="error-summary text-red-500">
                  <h3>Errors:</h3>
                  <ul>
                    {Object.entries(errors).map(([key, error]) => (
                      <li key={key}>{error.message}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </form>
        }
      </div>
    </div>
  );
};

export default Form;
