import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/AuthSlice";
import axiosInstance from "../../utils/AxiosInstance";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
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

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userstate = useSelector((state) => state.Auth);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const Send = async (data) => {
    try {
      const response = await axiosInstance.post('user/LogIn',data);
        const { accessToken, refreshToken, user } = response;
        dispatch(login({ User_id: user._id, Role: user.Role }));
        reset();
        navigate("/");  
    } catch (error) {
      console.log('error :' , error)
    }
  };
  return (
    <div className="flex justify-center items-center text-white bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-400 min-h-screen">
      <div className="flex w-1/2 max-sm:w-full justify-between  max-sm:mx-10 max-sm:p-8 p-5 shadow-sm shadow-gray-200 ">
        <div className=" flex flex-wrap w-full p-4 md:w-1/2">
          <p className="w-full text-center text-3xl  font-bold">Log in</p>
          <form
            onSubmit={handleSubmit(Send)}
            className="flex flex-wrap text-center text-black p-2 justify-center"
          >
            <div className="w-3/4 mb-3">
            <input
              type="email"
              placeholder="enter email"
              className="p-2 rounded-lg w-full "
              {...register("Email", { required: true })}
            />
             {errors.Email && (
                <p className="text-xs text-red-700 text-left p-1">{errors.Email.message}</p>
              )}
            </div>
           <div className="w-3/4 mb-3">
           <input
              type="text"
              placeholder="password"
              className="p-2 rounded-lg w-full"
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
              name="Sign In"
              className="m-3 rounded-xl w-3/4 bg-indigo-600 text-white p-1"
            />
          </form>
          <div className=" w-full flex flex-wrap justify-center text-gray-400">
            <Link to="/Forgot-Password">
              <button className="">Forgot Password?</button>
            </Link>
            <p className="text-center w-full">
              ( New User ? First{" "}
              <Link to="/SignIn">
                <button className="underline hover:text-blue-700">
                  Sign IN{" "}
                </button>
              </Link>{" "}
              )
            </p>
          </div>
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

export default LogIn;
