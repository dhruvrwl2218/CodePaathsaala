import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux"
import axiosInstance from '../../utils/AxiosInstance';
import { Navigate } from "react-router";
const AdminHome = () => {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchstats = async () => {
      try {
        
        const res = await axiosInstance.get('Utility/adminStats');
        // console.log(res.data.data.data);
        setData(res.data.data.data);
      } catch (error) {
        // console.log(error.response.status);
        if (error.response.status === 401) {
          try {
           
            const res = await axiosInstance.get('user/refreshTokens')
            // console.log(res);
            if (res.status === 200) {
              fetchstats();
            }
          } catch (error) {
            // console.log(error);
            dispatch(logout());
            toast.error();
            Navigate("/Login");
          }
        } else {
          toast.error("User session out");
        }
      }
    };
    fetchstats();
  }, []);

  return (
    <div className="bg-black w-3/5 p-5 flex gap-5 max-md:flex-col text-black font-serif">
      <div className="basis-1/4 bg-red-100 rounded-xl h-32 ">
        <p className="text-2xl text-center p-2">Total Users</p>
        <p className="text-5xl text-center p-2">{data?.LoggedUser}</p>
      </div>
      <div className="basis-1/4 bg-green-100 rounded-xl h-32 ">
        <p className="text-2xl text-center p-2">Total Courses</p>
        <p className="text-5xl text-center p-2">{data?.TotalCourses}</p>
      </div>
      <div className="basis-1/4 bg-blue-100 rounded-xl h-32 ">
        <p className="text-2xl text-center p-2">Enrolled User</p>
        <p className="text-5xl text-center p-2">{data?.TotalEnrollemnets}</p>
      </div>
      <div className="basis-1/4 bg-yellow-200 rounded-xl h-32 ">
        to be decided
      </div>
    </div>
  );
};

export default AdminHome;
