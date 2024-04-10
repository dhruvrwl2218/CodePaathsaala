import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const YourCourses = () => {
  const User_id = useSelector((state) => state.Auth.User_id);
  const [fetchedCourse, setFetchedCourse] = useState();
  const [coursecontent, setCourseContent] = useState(false);

  useEffect(() => {
    console.log(User_id);

    const fetchEnrolledCourses = async () => {
      try {
        const UserCourses = await axios.get(
          `http://localhost:8000/api/v1/Enroll/EnrolledCourses/${User_id}`,
          {
            withCredentials: true,
            // headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log(UserCourses);
        setFetchedCourse(UserCourses?.data?.data?.[3]);
        console.log(fetchedCourse);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEnrolledCourses();
  }, []);

  return (
    <div className="flex justify-center bg-black">
      <div className="w-2/3 text-white flex bg-neutral-800 m-2 p-2 max-md:flex-col max-sm:w-full my-12">
        <div className="items-center text-center p-1 m-1 order-2 w-1/3 shadow-sm shadow-indigo-400">
          <img
            src={fetchedCourse?.Thumbnail}
            alt="courseThumbail"
            className="p-2 m-2"
          />
          <p className="p-2 my-2">
            <span className="p-1 font-semibold text-lg">Discription:</span>
            {fetchedCourse?.Description}
          </p>
        </div>
        <div className="w-full">
          <p className="text-4xl font-semi-bold p-3 text-center ">
            {fetchedCourse?.Name}
          </p>
          <div className="flex gap-4 p-2 m-2 max-sm:flex-col max-sm:gap-2">
            <p>
              {" "}
              <span className="p-1 font-semibold text-lg">Status:</span> Online
            </p>
            <p>
              {" "}
              <span className="p-1 font-semibold text-lg">Language:</span>
              English
            </p>
            <p><span className="p-1 font-semibold text-lg">Duration :</span>{fetchedCourse?.Duration}</p>
          </div>
          <div className="shadow-sm shadow-indigo-400 p-5 m-5 text-center ">
            <button
              className=" font-semibold text-lg bg-indigo-600 w-full rounded-md p-4"
              onClick={() => {
                coursecontent === false
                  ? setCourseContent(true)
                  : setCourseContent(false);
              }}
            >
              Course Content
            </button>
            <ul className={coursecontent === true ? `` : `hidden`}>
              {fetchedCourse?.StudyMaterial.map((Content) => (
                <li
                  className="bg-indigo-300 list-none  p-2 text-center rounded-md font-semibold text-lg "
                  key={Content.FileUrl}
                  onClick={console.log()}
                ><a href={Content.FileUrl} target="_blank" rel="noopener noreferrer">{Content.FileName}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourCourses;
// in this we would have 2 section or div where one is with all the description
//  and all and other will contains the files of the courses if user clicks on the\
// files then it should be direct to do the recpective files like pdf and video type
