import React from "react";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import LogIn from "../../Pages/Auth/LogIn";
import UserNotAllowed from "./UserNotAllowed";
import DashBoard from "./DashBoard";
import { HiMenu } from "react-icons/hi";


const AdminRoutes = () => {
  const Role = useSelector((state) => state.Auth.Role);
  console.log(Role);

  return (
    <div className="bg-black">
      {Role === "Admin"?(
      <div className = "flex flex-col bg-black">
        <nav className="flex w-full justify-start text-white bg-black p-1 gap-2 mb-8 shadow-md shadow-slate-400">
        <div className="w-64 max-sm:hidden">logo</div>
        <button><HiMenu  className="text-4xl"/></button>
        <p className="text-4xl text-nowrap ">Admin DashBoard</p>
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


// let content;
// switch (Role) {
//     case "Admin":
//         content = <Outlet/>
//         break;
//     case "User" :
//         content = <UserNotAllowed/>
//         break;
//     default:
//         content = <LogIn/>;
// }
