import React from 'react'
import { Outlet } from 'react-router'
import { useSelector } from 'react-redux'
import{ LogIn } from '../../Pages/Auth';
// import { useState } from 'react';

const RestrictedPath = () => {
  const isLoggedIn = useSelector((state) => state.Auth.islogin);
  console.log("For Protected Routes" + isLoggedIn);
  // const [isLoggedIn,setIsLogged] = useState(true)
  return (
    <div>
      {isLoggedIn ? <Outlet/>: <LogIn/>}
     
    </div>
  )
}

export default RestrictedPath


// As of now for the admin side role ,role can only be changed by the changing the role
// to admin manually in the db 