import React from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPass = () => {

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
      } = useForm();
      const Send = async (data)=>{
        
            try {
              const res = await axios.post("http://localhost:8000/api/v1/user/forgot-Password",
              data,
              { withCredentials: true })
              if(res.status === 200){
                toast.success("Email sent successfully");
              }else{
                toast.error(res.error)
              }
            } catch (error) {
              toast.error("Server Error")
            }
      }
  return (
    <div className="flex justify-center items-center  bg-black h-screen text-white">
    <div className="flex w-2/3 max-sm:w-full py-4">
      <div
        className=" flex flex-col w-full p-4 border-2 mx-4"
      >
        <div className="w-full text-center text-3xl p-1 mb-5 font-bold">Forgot-Password</div>
        <p className="w-full text-center text-3xl p-2 mb-5 font-bold">Log in</p>
        <form onSubmit={handleSubmit(Send)} className="flex flex-col text-center gap-8 text-black">
          
            <input
              type="email"
              placeholder="enter email" 
              className="m-auto p-2 rounded-md w-1/2 max-sm:w-72"
              {...register("Email", { required: true })}
            />
          
          <input
            type="submit"
            name="Sign In"
            className="m-auto p-2 rounded-md w-1/2 bg-blue-700 max-sm:w-72"
          />
        </form>
        </div>
        <div>
        <img className=" w-full max-md:hidden"
          src="https://cdn.pixabay.com/photo/2018/07/14/11/33/earth-3537401_960_720.jpg"
          alt="img"
        />
      </div>
        </div>
        </div>
  )
}

export default ForgotPass
