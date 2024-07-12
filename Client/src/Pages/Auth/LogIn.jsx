import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/AuthSlice";
// import Cookies from 'js-cookie';

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userstate = useSelector((state) => state.Auth);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const Send = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/LogIn",
        data,
        { withCredentials: true }
      );
      console.log(response);

      if (response.status === 200) {
        toast.success("user logged In Sucessfully!");

        const { accessToken, refreshToken, user } = await response?.data?.data;

        console.log(user.Role);
        dispatch(login({ User_id: user._id, Role: user.Role }));
        reset();
        navigate("/");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("error while logging in :(");
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
            <input
              type="email"
              placeholder="enter email"
              className="m-3 p-1 rounded-xl w-3/4 "
              {...register("Email", { required: true })}
            />
            <input
              type="text"
              placeholder="password"
              className="m-3 p-1 rounded-xl w-3/4"
              {...register("Password", { required: true })}
            />
            <input
              type="submit"
              name="Sign In"
              className="m-3 p-1 rounded-xl w-3/4 bg-indigo-600  text-white"
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
