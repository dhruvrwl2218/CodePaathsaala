import React, { useState } from "react";
import Logo from "./Logo";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { islogin, logout } from "../../store/AuthSlice";
import { IoReorderThreeOutline } from "react-icons/io5";
import axiousInstance from "../../utils/AxiosInstance";

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
      const response = await axiousInstance.post(`user/logout`)
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
    <nav className=" text-white flex gap-4 h-20 shadow-md  z-1 sticky bg-neutral-900">
      <div className=" rounded-lg lg:mx-72 mx-80">
        <Link to="/">
          <Logo className={` w-full pt-5 `} />
        </Link>
      </div>

      <ul
        className={`${
          toggle
            ? `flex flex-col gap-4 absolute top-16 w-full bg-indigo-600 bg-opacity-30 shadow shadow-md-blue-600 item-center text-center py-2 `
            : `hidden  md:flex md:flex-row md:mt-3 `
        } `}
      >
        <li className="p-1 m-1 hover:text-lg hover:text-indigo-600 md:mx-5">
          <NavLink to="/">Home</NavLink>
        </li>
        {/* <li className="p-1 m-1 hover:text-lg hover:text-purple-950 md:mx-5">
          <NavLink to="/About">About</NavLink>
        </li> */}
        <li className="p-1 m-1 hover:text-lg hover:text-indigo-600 md:mx-5">
          <NavLink to="/Courses">Courses</NavLink>
        </li>
        <li className="p-1 m-1 hover:text-lg hover:text-indigo-600 whitespace-nowrap md:mx-5 ">
          <NavLink to="/YourCourses">Your Courses</NavLink>
        </li>
        {isAdmin === "Admin" && (
          <li className="p-1 m-1 hover:text-lg hover:text-indigo-600 whitespace-nowrap md:mx-5 ">
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
                ? `w-16 h-10 mt-3 p-1 px-2 mx-40 rounded-lg bg-indigo-600 `
                : `hidden`
            }`}
          >
            Log In
          </p>
        </Link>
        <button
          className={`${
            isLogin
              ? `h-12 mt-3 p-1 px-2 mx-40 rounded-lg bg-indigo-600`
              : `hidden`
          }`}
          onClick={LogOut}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Header;
