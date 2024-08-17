import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {UserCourseDisplay} from "../../Components/User-Page-Components";
import { toast } from "react-toastify";
import { logout } from "../../store/AuthSlice";
import axiosInstance from '../../utils/AxiosInstance';

const YourCourses = () => {
  const User_id = useSelector((state) => state.Auth.User_id);
  const [fetchedCourse, setFetchedCourse] = useState([]);
  const dispatch = useDispatch();
  // const [coursecontent, setCourseContent] = useState(false);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await axiosInstance.get(`Enroll/EnrolledCourses/${User_id}`);
        setFetchedCourse(response);
      } catch (error) {
        console.log('error:',error)
        if (error.response.status === 401) {
          try {
            
            const res = await axiosInstance.get('user/refreshTokens');
            if (res.status === 200) {
              fetchEnrolledCourses();
            }
          } catch (err) {
            dispatch(logout());
            toast.error("session out");
            Navigate("/Login");
          }
        } else {
          // toast.error("User session out"); // get the error message
          console.log('error',error)
        }
      }
    };
    fetchEnrolledCourses();
  }, []);

  return (
    <div className="grid grid-cols-12 mt-40">
      <div className="flex flex-wrap justify-center col-span-8 col-start-3 max-md:col-span-12 max-md:col-start-1">
        {fetchedCourse.length <= 0 ? (
          <div className="top-40 left-40 p-24 text-5xl text-center font-semibold text-indigo-500">
            <p>You haven't enrolled in any of the courses :(</p>
          </div>
        ) : (
          fetchedCourse?.map((Course) => <UserCourseDisplay props={Course} key={Course.Name} />)
        )}
      </div>
    </div>
  );
};

export default YourCourses;

