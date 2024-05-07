import React, { useState } from "react";
import Logo from "./Logo";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { islogin, logout } from "../store/AuthSlice";
import { IoReorderThreeOutline } from "react-icons/io5";

const Header = () => {
  const isLogin = useSelector(islogin);
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.Auth.Role);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const togglenavLinks = (e) => {
    if (toggle === false) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };
  const LogOut = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success(response.data.data);
        dispatch(logout());
        navigate("/Login");
      }
    } catch (error) {
      toast.error("error while logging out");
    }
  };
  return (
    <nav className="bg-black text-white flex gap-4 h-20 shadow-md shadow-indigo-400 z-1 sticky">
      <div className="m-1  border-x rounded-lg lg:mx-80 ">
        <Link to="/">
          <Logo className={`px-2 w-20 rounded-2xl `} />
        </Link>
      </div>

      <ul
        className={`${
          toggle
            ? `flex flex-col gap-4 absolute top-16 w-full bg-purple-900 bg-opacity-30 shadow shadow-md-blue-600 item-center text-center py-2 `
            : `hidden  md:flex md:flex-row md:mt-3 `
        } `}
      >
        <li className="p-1 m-1 hover:text-lg hover:text-purple-950 md:mx-5">
          <NavLink to="/">Home</NavLink>
        </li>
        {/* <li className="p-1 m-1 hover:text-lg hover:text-purple-950 md:mx-5">
          <NavLink to="/About">About</NavLink>
        </li> */}
        <li className="p-1 m-1 hover:text-lg hover:text-purple-950 md:mx-5">
          <NavLink to="/Courses">Courses</NavLink>
        </li>
        <li className="p-1 m-1 hover:text-lg hover:text-purple-950 whitespace-nowrap md:mx-5 ">
          <NavLink to="/YourCourses">Your Courses</NavLink>
        </li>
        {isAdmin === "Admin" && (
          <li className="p-1 m-1 hover:text-lg hover:text-purple-950 whitespace-nowrap md:mx-5 ">
            <NavLink to="/AdminHome">Admin</NavLink>
          </li>
        )}
      </ul>

      <button
        className="absolute right-2 m-1 md:hidden"
        onClick={togglenavLinks}
      >
        <IoReorderThreeOutline className="text-5xl" />
      </button>
      <div className="hidden md:flex md:mx-40">
        <Link to="/Login">
          <p
            className={`${
              !isLogin
                ? `w-20 mt-3 p-2 text-center mx-40 rounded-lg border-x  bg--00`
                : `hidden`
            }`}
          >
            Log In
          </p>
        </Link>
        <button
          className={`${
            isLogin ? `w-20 mt-3 p-2 mx-40 rounded-lg border-x` : `hidden`
          }`}
          onClick={LogOut}
        >
          Logout
        </button>
      </div>
    </nav>
    //     <nav  className="bg-black grid  grid-col-6 md:grid-col-12 gap-3 text-white sticky top-0 z-10 ">
    //     <div className=' mx-3 col-span-1 md:col-start-3 m-2 '><Link to = "/">
    //         <Logo className={`px-2 w-20 rounded-2xl`}/>
    //         </Link>
    //     </div>
    //     <ul> className="md:col-start-4 col-span-4 mt-2 flex items-center p-3 gap-4 "

    //         <li className="p-1 m-1 hover:text-xl"><NavLink to ="/">Home</NavLink ></li>
    //         <li className="p-1 m-1 hover:text-xl"><NavLink to ="/About">About</NavLink></li>
    //         <li className="p-1 m-1 hover:text-xl"><NavLink to ="/Courses">Courses</NavLink></li>
    //         <li className="p-1 m-1 hover:text-xl "><NavLink to ="/YourCourses">Your Courses</NavLink></li>

    //     </ul>
    //     <div className='mt-1 justify-space-around sm:col-start-8 col-span-2'>
    //         {/* <Link to="/updates"><p className="mt-5 p-1 px-3 border border-r-2">updates</p></Link> */}
    //         <Link to = "/Login"><p className="mt-3  p-1 px-4 border border-r-2 rounded-md w-20">Log in </p></Link>
    //         {/* <button  className=" my-5 border border-r-2 px-3"
    //         onClick={LogOut}>Logout</button> */}
    //     </div>
    // </nav>
  );
};

export default Header;
