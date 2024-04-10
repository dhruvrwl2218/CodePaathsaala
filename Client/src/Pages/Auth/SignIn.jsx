import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const send = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/user/SignIn/User`,
        data, { withCredentials: true }
      );

      console.log(response);
      console.log(response?.status);
      // console.log(response?.data?.statusCode)
      // console.log(response.data.message)
      // console.log(response.message)
      if (response.status === 200) {
        toast.success("User Successfully Registered!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          // transition: Bounce,
        });
        reset();
        navigate("/Login");
      }
      
    } catch (error) {
      // console.log(error);
      // console.log(error.response.message)
      // console.log(error.response.data.data)
      if(error)
      toast.error(error.response.data.data,{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Bounce,
      });
    }
  };
  return (
  <div className="flex justify-center items-center  bg-black h-screen text-white">
     <div className="flex  w-2/3 max-sm:w-full py-4 ">
     
      <div className="flex flex-col w-full p-4 border-2 mx-4">
        <div className="w-full text-center text-3xl p-1 mb-5 font-bold">logo</div>
        <p className="w-full text-center text-3xl p-2 mb-5 font-bold"> Sign In</p>
        <form onSubmit={handleSubmit(send)} className="flex flex-col text-center gap-8 text-black">
          
            
            <input
              type="text"
              placeholder="fullName"
              className="m-auto p-2 rounded-md w-1/2 max-sm:w-72"
              {...register("FullName", { required: true })}
            />
          
          
            
            <input
              type="email"
              placeholder="enter email"
              className="m-auto p-2 rounded-md w-1/2 max-sm:w-72"
              {...register("Email", { required: true })}
            />
         
          
            <input
              type="text"
              placeholder="password"
              className="m-auto p-2 rounded-md w-1/2 max-sm:w-72"
              {...register("Password", { required: true })}
            />
         
          <input
            type="submit"
            name="Sign In "
            className="m-auto p-2 rounded-md w-1/2 bg-blue-700 max-sm:w-72 text-white"
          />
        </form>
      </div>
      <div className=" w-full max-sm:hidden">
        <img
          src="https://cdn.pixabay.com/photo/2018/07/14/11/33/earth-3537401_960_720.jpg"
          alt="img"
        />
      </div>
    </div>
  </div>
   
  );
};

export default SignIn;
// } else {
      //   toast.error(response.data.message, {
      //     position: "top-right",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "colored",
      //     // transition: "Bounce",
      //   });
      // }