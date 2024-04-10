import React from 'react'
import useform from 'react-hook-form'
const Enrollment = () => {

    const {
        register,
        handlesubmit,
        reset
    } = useform();
  return (
    <div>
      <form action="" >
        <label htmlFor="">Email<input type="email" {...register("Email")}/></label>
        <label htmlFor="">Course Name : <input type="text"{...register("CourseName")} /></label>
        <label htmlFor=""></label>
      </form>
    </div>
  )
}

export default Enrollment
