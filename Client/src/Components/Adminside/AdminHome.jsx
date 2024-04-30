import React,{useEffect,useState} from 'react'
import axios from 'axios'
const AdminHome = () => {
  const[data,setData] = useState();
  useEffect(()=>{
   

    const fetchstats = async() => {
        try {
          const res = await axios.get("http://localhost:8000/api/v1/Utility/adminStats",
          { withCredentials: true });
          console.log(res.data.data.data)
          setData(res.data.data.data);
        } catch (error) {
          console.log(error)
        }
    }
    fetchstats();
},[])

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
   
  )
}

export default AdminHome
