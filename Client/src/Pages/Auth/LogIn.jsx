import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { login } from "../../store/AuthSlice";
import Cookies from 'js-cookie';


const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userstate = useSelector(state=> state.Auth);
  
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
         
        // const accessexpiryDate = new Date();
        // accessexpiryDate.setDate(accessexpiryDate.getDate() + 1);

        // const refreshexpiryDate =  new Date();
        // refreshexpiryDate.setDate(refreshexpiryDate.getDate() + 15);

        //   console.log(refreshexpiryDate + accessexpiryDate);

        // Cookies.set('accessToken', accessToken, { expires: accessexpiryDate , path: '/'});
        // Cookies.set('refreshToken', refreshToken, { expires: refreshexpiryDate , path: '/'});

    
        // localStorage.setItem("accessToken", accessToken);
        // localStorage.setItem("refershToken", refreshToken);
        // console.log(user)
        // console.log(user._id)
        console.log(user.Role)
        dispatch(login( {User_id : user._id , Role : user.Role}));
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
    <div className="flex justify-center items-center  bg-black h-screen text-white">
    <div className="flex w-2/3 max-sm:w-full py-4">
      <div
        className=" flex flex-col w-full p-4 border-2 mx-4"
      >
        <div className="w-full text-center text-3xl p-1 mb-5 font-bold">logo</div>
        <p className="w-full text-center text-3xl p-2 mb-5 font-bold">Log in</p>
        <form onSubmit={handleSubmit(Send)} className="flex flex-col text-center gap-8 text-black">
          
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
            name="Sign In"
            className="m-auto p-2 rounded-md w-1/2 bg-blue-700 max-sm:w-72 text-white"
          />
        </form>
        <Link to="/Forgot-Password"><button className="p-4 my-1 text-center w-full hover:text-blue-700">Forgot Password?</button></Link>
        <p className="p-4 my-5 text-center w-full">
          ( New User ? First{" "}
          <Link to="/SignIn">
            <button className="underline hover:text-blue-700">Sign IN </button>
          </Link>{" "}
          )
        </p>
        
      </div>
      <div>
        <img className=" w-full max-sm:hidden"
          src="https://cdn.pixabay.com/photo/2018/07/14/11/33/earth-3537401_960_720.jpg"
          alt="img"
        />
      </div>
    </div>
    </div>
  );
};

export default LogIn;


// const Role = response.data
        // console.log(Role)
        // console.log(accessToken);
        // console.log(refreshToken);
        // console.log(user);
        // console.log(user._id)
        
        // const Role = user?.Role;
        // console.log(Role);
        // console.log()