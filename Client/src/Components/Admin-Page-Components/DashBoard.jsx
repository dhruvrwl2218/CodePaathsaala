import React from 'react'
import { NavLink} from 'react-router-dom'


const DashBoard = () => {

  return (
    <div className="flex flex-col max-sm:hidden ">
      <section id='sidebar' className='h-full'>
        <ul className="list-none text-xl p-3 py-5 h-full bg-black rounded-lg gap-3  w-64 border border-x-neutral-500 text-indigo-400">
        <NavLink to={"/AdminHome"}><li className = "rounded-md p-2  m-2 text-center hover:shadow-sm hover:shadow-gray-100 bg-neutral-800">Home</li></NavLink>
        <NavLink to={"/CourseList"}><li className = "rounded-md p-2 m-2 text-center hover:shadow-sm hover:shadow-gray-100 bg-neutral-800">Courses</li></NavLink>
        <NavLink to={"/EnrolledUser"}><li className = "rounded-md p-2  m-2 text-center shadow-md  hover:shadow-sm hover:shadow-gray-100 bg-neutral-800">Enrolled Users</li></NavLink>
        <NavLink to={"/AddCourses"}><li className = "rounded-md p-2  m-2 text-center hover:shadow-sm hover:shadow-gray-100 bg-neutral-800">Add Course</li></NavLink>
       </ul>
      </section>
    </div>
  )
}

export default DashBoard
