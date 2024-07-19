import React from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utils/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";


const ResetPassword = () => {
  const { token } = useParams();
  const Navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const Send = async (data) => {
    console.log(data);
    try {
      // const res = axios.post(
      //   `${process.env.url}/user/reset-Password/${token}`,
      //   data,
      //   { withCredentials: true }
      // );
      const res = axiosInstance.post(`/user/reset-Password/${token}`,data)

      if (res.status === 200) {
        toast.success("Password updated Sucessfully!");
        Navigate("/Login");
      } else {
        throw res;
      }
    } catch (error) {
      // console.log(error);
      toast.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center text-white bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-400 min-h-screen">
      <div className="flex w-1/2 max-sm:w-full justify-between  max-sm:mx-10 max-sm:p-8 p-5 shadow-sm shadow-gray-200 ">
        <div className=" flex flex-wrap w-full p-4 md:w-1/2">
          <p className="w-full text-center text-3xl font-bold">
            Password-Reset
          </p>

          <form
            onSubmit={handleSubmit(Send)}
            className="flex flex-wrap text-center w-full text-black justify-center"
          >
            <input
              type="password"
              placeholder="Enter new Password"
              className="m-6 p-1 rounded-xl w-full h-12 text-gray-800 "
              {...register("new_password", { required: true })}
            />

            <input
              type="submit"
              name="Sign In"
              className=" m-6 p-1 rounded-xl w-full bg-indigo-500 text-white h-12"
            />
          </form>
          <p className="mt-16 p-2 text-sm text-gray-400">
            Do make sure to reset the password within 2 min other wise link
            token would be expired
          </p>
        </div>
        <div>
          <img
            className=" w-full max-sm:hidden"
            src="https://cdn.pixabay.com/photo/2018/07/14/11/33/earth-3537401_960_720.jpg"
            alt="img"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
