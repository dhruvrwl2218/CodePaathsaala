import React from 'react'
import {Header, Footer} from './Components/User-Page-Components';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom'
import "./index.css"

const App = () => {
  const location = useLocation();

  const pathsHavingHeaderFooter = [
    "/",
    "/YourCourses",
    "/Courses",
    "/About" ,
  ];

  const ToIncludeHeadFoot = pathsHavingHeaderFooter.includes(location.pathname);

  return (
    <div className='bg-black min-h-screen'>
       {ToIncludeHeadFoot && <Header/>}
        <Outlet />
        {ToIncludeHeadFoot && <Footer/>}
        
    </div>
  )
}

export default App
