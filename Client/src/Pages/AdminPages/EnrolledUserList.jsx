import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { useForm } from "react-hook-form";
import {Pagination} from "../../Components/Admin-Page-Components";
import {CourseUserDeletion} from "../../Components/Admin-Page-Components/Pop-ups";
import { toast } from "react-toastify";

const EnrolledUserList =  () => {


  const [enrolledUser, setEnrolledUser] = useState();
  const [filteredEnrolledUser, setFilteredEnrolledUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { register, handleSubmit } = useForm();
  const [page, setPage] = useState(1);
  const [itemsPerPage,setItemsPerPage] = useState(8)
  const [totalPages , setTotalPages] = useState(0)



  useEffect(() => {
    const FetchEnrolledUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/Enroll/EnrolledUser`,
          {
            withCredentials: true,
            // headers: { "Content-Type": "multipart/form-data" },
          }
        );
        // console.log(res)
        // console.log(res?.data?.data?.enrollments);
        setEnrolledUser(res.data.data.enrollments);
        setFilteredEnrolledUser(res.data.data.enrollments);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    FetchEnrolledUser();
  }, []);

  useEffect(()=>{
    const NoofPages = Math.ceil(filteredEnrolledUser?.length/itemsPerPage)||1;
    setTotalPages(NoofPages);
  },[filteredEnrolledUser])

  const CourseSearchOptions = enrolledUser
    ?.map((Course) => Course.Course.Name)
    .reduce((acc, currentValue) => {
      if (!acc.includes(currentValue)) {
        acc.push(currentValue);
      }
      return acc;
    }, []);

  const SearchUsers = async (data) => {
    // console.log(data);
    // console.log(data.User);
    // console.log(data.selectCourses);
    if (!data.User || data.User === "") {
      const filteredData = await enrolledUser.filter(
        (enrolled) => enrolled.Course.Name === data.selectCourses
      );

      // console.log(filteredData)
      const filtereddataaa = filteredData.map((data, index) => ({
        ...data,
        Index: index + 1,
      }));
      // console.log(filtereddataaa);
      setFilteredEnrolledUser(filtereddataaa);
      setPage(1);
      return;
    }
    if (!data.selectCourses || data.selectCourses === "") {
      const filteredData = enrolledUser.filter(
        (enrolled) => enrolled.User.FullName === data.User
      );

      const filtereddataaa = filteredData.map((data, index) => ({
        ...data,
        Index: index + 1,
      }));

      setFilteredEnrolledUser(filtereddataaa);
      setPage(1);
      return;
    } else {
      const filteredData = enrolledUser.filter(
        (enrolled) =>
          enrolled.User.FullName === data.User &&
          enrolled.Course.Name === data.selectCourses
      );

      const filtereddataaa = filteredData.map((data, index) => ({
        ...data,
        Index: index + 1,
      }));

      setFilteredEnrolledUser(filtereddataaa);
      setPage(1);
    }
  };

  //  console.log(CourseSearchOptions);
  // console.log(enrolledUser)
  // console.log(CourseDetails)


  const onPageChange = (newPage) =>{
    if(newPage >= 1 && newPage <= totalPages){
      setPage(newPage)
    }
  }
  
  let ListStart = (page - 1) * itemsPerPage;
  let ListEnd = ListStart + itemsPerPage;
 

  const deleteEnrollement = async(_id) => {
    console.log("Enrolled User" + _id)
    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/Enroll/deleteEnrollment/${_id}`);

      console.log(res);
      if(res.status === 200){
        toast.success("Enrollment deleted successfully!")
      }else{
        toast.error(res.error)
      }
    } catch (error) {
      console.log(error)
      toast.error(res.error)
    }
  }

  return (
    <div className="bg-black w-3/5 text-white flex flex-wrap justify-center max-md:w-full p-8 pt-0 mx-1 rounded-lg">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="text-gray-200 w-full">
          <div className="text-4xl w-full text-indigo-500 p-2 text-center font-semibold bg-neutral-800">Enrolled User's</div>
          <form
            className=" bg-grey-100 flex justify-between p-5 "
            onSubmit={handleSubmit(SearchUsers)}
          >
            <div className="flex w-full justify-between">
              <select
                name="SelectCourse"
                id="drop-down"
                {...register("selectCourses")}
                defaultValue=""
                className="bg-neutral-800 p-3 rounded-l-3xl w-full"
              >
                <option value="">Search by Course</option>
                {CourseSearchOptions.map((CourseName, index) => (
                  <option key={index} value={CourseName} className="text-wrap">
                    {CourseName}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="rounded-r-3xl bg-neutral-800 p-3 border-l w-full"
                placeholder="UserName"
                {...register("User")}
              />
            </div>
            <div>
              <button
                className="p-3 rounded-xl ml-12 bg-indigo-600"
                {...register}
              >
                Search
              </button>
            </div>
          </form>
          <table className="w-full mx-2 rounded-lg  ">
            <thead className=" h-16 bg-neutral-800">
              <tr className="p-5">
                <th className=" rounded-tl-lg">S.no.</th>
                <th>User Name</th>
                <th className="max-sm:hidden">User Email</th>
                <th>Course Name</th>
                <th className="max-sm:hidden">Date</th>
                <th>Actions</th>
              </tr>
            </thead> 

            <tbody className="text-center text-lg">
              {filteredEnrolledUser.length === 0 ? (
                <p className="text-center justify-center">No Enrolled User..</p>
              ) : (
                
                filteredEnrolledUser
                  .slice(ListStart, ListEnd)
                  .map(({ User, Course, Date, Index ,_id}, index) => (
                    
                    <tr
                      key={_id}
                      
                      className={index % 2 === 0 ? `bg-indigo-900` : `bg-black`}
                    >
                      <td>{Index != null ? Index : index + 1}</td>
                      <td>{User?.FullName}</td>
                      <td className="max-sm:hidden">{User?.Email}</td>
                      <td>{Course?.Name}</td>
                      <td className="max-sm:hidden">{Date}</td>
                      <td>
                        { 
                          <button onClick={()=>deleteEnrollement(_id)}>
                            <div
                              className="p-1 m-1 rounded-lg"
                              style={{
                                backgroundColor: "#1c1c1c",
                              }}
                            >
                              <MdDelete
                                className="w-8 h-auto p-1"
                                style={{
                                  color: "#bd1414",
                                }}
                              />
                            </div>
                          </button>
                        }
                         
                      </td>
                    </tr>     
                  ))
              )}
            </tbody>
          </table>
          <div className="flex justify-center px-2 mt-8 bg-neutral-800">
              <Pagination
               totalPages = {totalPages} 
               onPageChange = {onPageChange}
               currentPage={page}
               pageListLimit= {3} 
               />
              </div>         
        </div>
      )}
    </div>
  );
};

export default EnrolledUserList;







  // let paginationvalues = await () =>{
  //   
  //               
  //               
  //               return{ListStart,ListEnd}
  // }
  // setPageList(filteredEnrolledUser.slice(ListStart,ListEnd))
  // console.log(pagelist);

  
  //paginaiton
  // const listItems = 10;