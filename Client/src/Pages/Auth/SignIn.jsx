import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utils/AxiosInstance";
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
      // const response = await axios.post(
      //   `${process.env.url}/user/SignIn/User`,
      //   data,
      //   { withCredentials: true }
      // );
      const response = await axiosInstance.post(`user/SignIn/User`,data)

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
      
      if (error)
        toast.error(error.response.data.data, {
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
    <div className="flex justify-center items-center  text-white bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-400 min-h-screen">
      <div className="flex w-1/2 max-sm:w-full justify-between  max-sm:mx-10 max-sm:p-8 p-5 shadow-sm shadow-gray-200 ">
        <div className="flex flex-wrap full p-4 md:w-1/2">
          <p className="w-full text-center text-3xl font-bold"> Sign In</p>
          <form
            onSubmit={handleSubmit(send)}
            className="flex flex-wrap text-center text-black p-2 justify-center"
          >
            <input
              type="text"
              placeholder="fullName"
              className="m-3 p-1 rounded-md w-3/4 "
              {...register("FullName", { required: true })}
            />
            <input
              type="email"
              placeholder="enter email"
              className="m-3 p-1 rounded-md w-3/4"
              {...register("Email", { required: true })}
            />
            <input
              type="text"
              placeholder="password"
              className="m-3 p-1 rounded-md w-3/4"
              {...register("Password", { required: true })}
            />

            <input
              type="submit"
              name="Sign In "
              className="m-3 p-1 rounded-md w-3/4 bg-indigo-600  text-white"
            />
          </form>
        </div>
        <div className=" w-1/2 max-sm:hidden">
          <img src="/Nerd Niche (1).gif" alt="img" />
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
