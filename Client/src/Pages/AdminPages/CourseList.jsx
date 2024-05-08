import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import {useNavigate} from "react-router-dom";
import {CourseUserDeletion , AddFiles } from "../../Components/Admin-Page-Components/Pop-ups";



const CourseList = () => {
  const [course, setCourse] = useState([]);
  const [popup,setPopup] = useState(false);
  const [adddlt,setAddDlt] = useState([])

  const Navigate = useNavigate();

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

  
  const EditIt = (_id)=>{
    Navigate(`/EditCourse/${_id}`)
  }

  const addFiles = (_id)=>{
    console.log("Sec" + _id)
    setAddDlt(["addFiles",`http://localhost:8000/api/v1/Course/addFiles/${_id}`])
    setPopup(true);
   
  }

  
  const deleteCourse = async (_id) =>{
    console.log("First" + _id)
    setPopup(true);
    setAddDlt(["deleteCourse",`http://localhost:8000/api/v1/Course/remove/${_id}`])
  }
  
  const removePopUp = ()=>{
    setPopup(false);
  }

  return (
    <div className="bg-black w-3/5 text-white flex flex-wrap justify-center max-sm:w-full ">
      {popup != false && <div className = " bg-indigo-800 opacity-70 fixed inset-0 flex items-center justify-center z-50 max-sm:mx-10">
        {adddlt[0] === "addFiles" ? <AddFiles api = {adddlt[1]} removePopUp = {removePopUp} />:<CourseUserDeletion removePopUp = {removePopUp} api = {adddlt[1]}/>}
        </div>}
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
          {course?.map(({_id,Name,Description,Level,Thumbnail,Duration,Price})=>(
            <tr className="p-2 text-lg max-h-10 bg-neutral-900 max-sm:text-sm border">
              <td className="w-1/4  "><img src={Thumbnail} alt="Thumbnail" className="w-1/2 h-auto rounded-xl m-2" /></td>
              <td className="w-1/6 text-wrap text-center ">{Name}</td>
            <td className="w-1/8 text-center ">{Level}</td>
            <td className="text-center ">{Duration}</td>
            <td className="text-center">{Price}</td>
            <td className="text-center"><button>
          <div
            className="p-1 m-1 rounded-lg"
            style={{
              backgroundColor: "#1c1c1c",
            }}
          >
           <MdEdit
              className="w-8 h-auto p-1"
              style={{
                color: "#bd1414",
              }}
              onClick={()=> EditIt(_id)}
            />
            <HiOutlineDocumentAdd 
            className="w-8 h-auto p-1"
            style={{
              color: "#bd1414",
            }}
            onClick={()=> addFiles(_id)}/>
          </div>
        </button></td>
      <td className="text-center">{  <button>
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
              onClick={()=>deleteCourse(_id)}
            />
          </div>
        </button>}</td>
            </tr>  
          ))}
        </tbody>
      </table>
      
    </div>
  )
};

export default CourseList;


{/* 
// {course?.map((items) => (
//   <AdminCourseCard key={items._id}
//     Name={items?.Name}
//     Description={items?.Description}
//     Level={items?.Level}
//     Img={items?.Thumbnail}
//     Duration={items?.Duration}
//     Price={items?.Price}
//     _id = {items?._id}
//   />
// ))} */}