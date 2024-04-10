import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminCourseCard from "./AdminCourseCard";

const CourseList = () => {
  const [course, setCourse] = useState([]);

  useEffect(() => {
    const Courses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/Course/AllCourses",
          { withCredentials: true }
        );
        console.log(res?.data?.data);
        setCourse(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    Courses();
  }, []);
  return (
    <div className="bg-black w-3/5 text-white flex flex-wrap justify-center max-sm:w-full">
      
      <table className="w-full m-4 mt-0 p-5">
        <thead>
          <tr className="h-16 text-lg bg-neutral-800 shadow-md shadow-white max-sm:text-sm">
            <th>Image</th>
            <th>Name</th>
            <th>Level</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {course?.map((items) => (
        <AdminCourseCard key={items._id}
          Name={items?.Name}
          Description={items?.Description}
          Level={items?.Level}
          Img={items?.Thumbnail}
          Duration={items?.Duration}
          Price={items?.Price}
          _id = {items?._id}
        />
      ))}
        </tbody>
      </table>
      
    </div>
  )
};

export default CourseList;
