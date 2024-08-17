import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utils/AxiosInstance";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  FullName: yup
    .string()
    .min(3, "at least 3 characters")
    .max(20, "maximum of 20 characters")
    .required("Name is required"),
  Email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  Password: yup
    .string()
    .min(8, "Min 8 char")
    .matches(/[^A-Za-z0-9]/, "Password must include a special character")
    .required("Password is required"),
});
const SignIn = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const send = async (data) => {
    try {
      const response = await axiosInstance.post(`user/SignIn/User`, data);
      console.log(response)
        reset();
        navigate("/Login");
    } catch (error) {
      console.log('error :',error)
    };
  }
  return (
    <div className="flex justify-center items-center  text-white bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-400 min-h-screen">
      <div className="flex w-1/2 max-sm:w-full justify-between  max-sm:mx-10 max-sm:p-8 p-5 shadow-sm shadow-gray-200 ">
        <div className="flex flex-wrap full p-4 md:w-1/2">
          <p className="w-full text-center text-3xl font-bold">Sign In</p>
          <form
            onSubmit={handleSubmit(send)}
            className="flex flex-wrap text-center text-black p-2 justify-center"
          >
            <div className=" w-3/4 m-3">
              <input
                type="text"
                placeholder="fullName "
                className="w-full p-1 rounded-md"
                {...register("FullName")}
              />
              {errors.FullName && (
                <p className="text-xs text-red-700 text-left p-1">
                  {errors.FullName.message}
                </p>
              )}
            </div>
            <div className=" w-3/4 m-3">
              <input
                type="email"
                placeholder="enter email"
                className="p-1 rounded-md w-full"
                {...register("Email")}
              />
              {errors.Email && (
                <p className="text-xs text-red-700 text-left p-1">{errors.Email.message}</p>
              )}
            </div>
            <div className="w-3/4 m-3">
              <input
                type="password"
                placeholder="password"
                className="p-1 rounded-md w-full"
                {...register("Password")}
              />
              {errors.Password && (
                <p className="text-xs text-red-700 text-left p-1">
                  {errors.Password.message}
                </p>
              )}
            </div>
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



