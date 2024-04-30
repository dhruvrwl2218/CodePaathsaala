import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import UserCourseDisplay from "../Components/UserCourseDisplay";

const YourCourses = () => {
  const User_id = useSelector((state) => state.Auth.User_id);
  const [fetchedCourse, setFetchedCourse] = useState();
  const [coursecontent, setCourseContent] = useState(false);
  

  useEffect(() => {
    console.log(User_id);

    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/Enroll/EnrolledCourses/${User_id}`,
          {
            withCredentials: true,
            // headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log(response?.data?.data);
        setFetchedCourse(response?.data?.data);
       
      } catch (error) {
        console.log(error);
      }
    };
    fetchEnrolledCourses();
  }, []);

  return (
    <div className="grid grid-cols-12 ">
       <div className="flex flex-wrap justify-center bg-black col-span-8 col-start-3 max-md:col-span-12 max-md:col-start-1">
     {fetchedCourse?.map((Course)=>(
      <UserCourseDisplay props={Course}/>
     ))}
    </div>
    </div>
  );
};

export default YourCourses;


// in this we would have 2 section or div where one is with all the description
//  and all and other will contains the files of the courses if user clicks on the\
// files then it should be direct to do the recpective files like pdf and video type
