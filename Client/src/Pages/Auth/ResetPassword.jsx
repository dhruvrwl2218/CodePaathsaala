import React from 'react'
import { useParams } from 'react-router'
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";


const ResetPassword = () => {
    const {token} = useParams();
    const Navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
      } = useForm();

      const Send = async(data)=>{
        console.log(data)
        try {
            const res = axios.post(`http://localhost:8000/api/v1/user/reset-Password/${token}`,
            data,
            { withCredentials: true }
            )

            if(res.status === 200){
                console.log("new pass saved")
                toast.success("Password updated Sucessfully!")
                Navigate("/Login")
            }else{
                console.log(res.error)
            }
        } catch (error) {
            console.log(error)
            toast.error(error)
        }
      }

  return (

      <div className="flex justify-center items-center  bg-black h-screen text-white">
    <div className="flex w-2/3 max-sm:w-full py-4">
      <div
        className=" flex flex-col w-full p-4 border-2 mx-4"
      >
        <div className="w-full text-center text-3xl p-1 mb-5 font-bold">logo</div>
        <p className="w-full text-center text-3xl p-2 mb-5 font-bold">Password-Reset</p>
        <form onSubmit={handleSubmit(Send)} className="flex flex-col text-center gap-8 text-black ">
          
            <input
              type="password"
              placeholder="Enter new Password"
              className="m-auto p-2 rounded-md w-1/2 max-sm:w-72"
              {...register("new_password", { required: true })}
            />
          
          <input
            type="submit"
            name="Sign In"
            className="m-auto p-2 rounded-md w-1/2 bg-blue-700 max-sm:w-72"
          />
        </form>
        </div>
        <div>
        <img className=" w-full max-sm:hidden"
          src="https://cdn.pixabay.com/photo/2018/07/14/11/33/earth-3537401_960_720.jpg"
          alt="img"
        />
      </div>
        </div>
        </div>
    
  )
}

export default ResetPassword
