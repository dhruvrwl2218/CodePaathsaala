import React from "react";
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
  const Send = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/forgot-Password",
        data,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Email sent successfully");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };
  return (
    <div className="flex justify-center items-center text-white bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-400 min-h-screen">
      <div className="flex w-1/2 max-sm:w-full justify-between  max-sm:mx-10 max-sm:p-8 p-5 shadow-sm shadow-gray-200 ">
        <div className="flex flex-wrap w-full p-4 md:w-1/2 justify-center">
          <p className="w-full text-center text-3xl  font-bold mb-16">
            Forgot-Password
          </p>

          <form
            onSubmit={handleSubmit(Send)}
            className="flex flex-wrap text-center w-full text-black justify-center "
          >
            <input
              type="email"
              placeholder="enter email"
              className=" m-6 p-1 rounded-xl w-full h-12 text-gray-800 "
              {...register("Email", { required: true })}
            />

            <input
              type="submit"
              name="Sign In"
              className=" m-6 p-1 rounded-xl w-full bg-indigo-500 text-white h-12"
            />
          </form>
          <p className="mt-16 p-2 text-sm text-gray-400">
            Password reset link would be sent on your given email do make sure
            to click on the link and reset the password with in 2 min
          </p>
        </div>
        <div>
          <img
            className=" w-full max-md:hidden"
            src="/Nerd Niche (1).gif"
            alt="img"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
