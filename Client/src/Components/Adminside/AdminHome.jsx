import React from 'react'

const AdminHome = () => {
  return (
    <div className="bg-black w-3/5 p-5 flex gap-5 max-md:flex-col text-black font-serif">
      <div className="basis-1/4 bg-red-100 rounded-xl h-32 ">
        <p className="text-2xl text-center p-2">Total Users</p>
        <p className="text-5xl text-center p-2">500</p>
      </div>
      <div className="basis-1/4 bg-green-100 rounded-xl h-32 ">
        <p className="text-2xl text-center p-2">Total Courses</p>
        <p className="text-5xl text-center p-2">10</p>
      </div>
      <div className="basis-1/4 bg-blue-100 rounded-xl h-32 ">
        <p className="text-2xl text-center p-2">Enrolled User</p>
        <p className="text-5xl text-center p-2">100</p>
      </div>
      <div className="basis-1/4 bg-yellow-200 rounded-xl h-32 ">
         to be decided 
      </div>
    </div>
  )
}

export default AdminHome
