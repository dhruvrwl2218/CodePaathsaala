import React from "react";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import {LogIn} from "../../Pages/Auth";
import UserNotAllowed from "../Restricted-Page-Components/UserNotAllowed";
import DashBoard from "./DashBoard";
import { HiMenu } from "react-icons/hi";
import { PiUsersThreeFill } from "react-icons/pi";
import { useNavigate } from "react-router";


const AdminRoutes = () => {
  const Role = useSelector((state) => state.Auth.Role);

  const navigate = useNavigate();
 
  return (
    <div className="bg-black">
      {Role === "Admin"?(
      <div className = "flex flex-col bg-black">
        <nav className="flex w-full justify-start text-white bg-black p-1 gap-2 mb-8 shadow-md shadow-slate-400">
        <div className="w-64 max-sm:hidden">logo</div>
        <button><HiMenu  className="text-3xl"/></button>
        <p className="text-4xl text-nowrap ">Admin DashBoard</p>
        <button onClick={(e)=> navigate('/')}><PiUsersThreeFill className="text-3xl"/></button>
      </nav>
      <div className="flex justify-center bg-black mx-24 max-md:mx-2">
      <DashBoard/>
        <Outlet />
      </div>
      </div>
      ):Role === "User"?(
      <UserNotAllowed />
      ):(
      <LogIn />)
}
    </div>
  );
};

export default AdminRoutes;

