import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { useForm } from "react-hook-form";
const EnrolledUserList = () => {
  const [enrolledUser, setEnrolledUser] = useState();
  const [filteredEnrolledUser, setFilteredEnrolledUser] = useState();
  // const [coursedetails, setCorseDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { register,  handleSubmit } = useForm();

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

  

  const CourseSearchOptions = enrolledUser
    ?.map((Course) => Course.Course.Name)
    .reduce((acc, currentValue) => {
      if (!acc.includes(currentValue)) {
        acc.push(currentValue);
      }
      return acc;
    }, []);

  const SearchUsers = (data) => {
    console.log(data);
    console.log(data.User);
    console.log(data.selectCourses);
    if (!data.User || data.User === "") {
      const filteredData = enrolledUser.filter(
        (enrolled) => enrolled.Course.Name === data.selectCourses
      );
      // console.log(filteredData)
      setFilteredEnrolledUser(filteredData);
      return;
    }
    if (!data.selectCourses || data.selectCourses === "") {
      const filteredData = enrolledUser.filter(
        (enrolled) => enrolled.User.FullName === data.User
      );
      // console.log(filteredData)
      setFilteredEnrolledUser(filteredData);
      return;
    } else {
      const filteredData = enrolledUser.filter(
        (enrolled) =>
          enrolled.User.FullName === data.User &&
          enrolled.Course.Name === data.selectCourses
      );
      // console.log(filteredData)
      setFilteredEnrolledUser(filteredData);
    }
  };
  //  console.log(CourseSearchOptions);
  // console.log(enrolledUser)
  // console.log(CourseDetails)

  const deleteEnrolledUser = () => {

    // TO do : complete this deletinion 
  }


  return (
    <div className="bg-black w-3/5 text-white flex flex-wrap justify-center max-md:w-full border border-gray-500 p-2 mx-1 rounded-lg">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="text-gray-200 w-full">
          <form
            className="h-12 ml-5 bg-grey-100 flex justify-between"
            onSubmit={handleSubmit(SearchUsers)}
          >
            <div>
              <select
                name="SelectCourse"
                id="drop-down"
                {...register("selectCourses")}
                defaultValue=""
                className="bg-neutral-800 p-1  border border-gray-500 rounded-l-3xl w-40"
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
                className="rounded-r-3xl bg-neutral-800 p-1  border border-gray-500"
                placeholder="UserName"
                {...register("User")}
              />
            </div>
            <div>
              <button
                className="bg-neutral-800 px-2 py-1  border border-gray-500 rounded-lg"
                {...register}
              >
                Search
              </button>
            </div>
          </form>
          <table className="w-full mx-2 rounded-lg ml-5 ">
            <thead className="bg-black h-16">
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
                filteredEnrolledUser.map(({ User, Course, Date }, index) => (
                  <tr
                    key={enrolledUser?._id}
                    className={index % 2 === 0 ? `bg-blue-600` : `bg-black`}
                  >
                    <td>{index + 1}</td>
                    <td>{User?.FullName}</td>
                    <td className="max-sm:hidden">{User?.Email}</td>
                    <td>{Course?.Name}</td>
                    <td className="max-sm:hidden">{Date}</td>
                    <td>
                      {
                        <button onClick={deleteEnrolledUser}>
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
            <tfoot></tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default EnrolledUserList;
{
  /* <td className="text-center">{  <button>
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
        </button>}</td> */
}
