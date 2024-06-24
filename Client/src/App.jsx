import React from 'react'
import {Header, Footer} from './Components/User-Page-Components';
import { useLocation,Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom'
import "./index.css"

const App = () => {
  const location = useLocation();

  const pathsHavingHeaderFooter = [
    "/",
    "/YourCourses",
    "/Courses",
    "/About" ,
    "/IssuePage"
  ];

  const ToIncludeHeadFoot = pathsHavingHeaderFooter.includes(location.pathname);

  return (
    <div className='bg-black min-h-screen '>
       {ToIncludeHeadFoot && <Header/>}
        <Outlet />
        <Link to = "/IssuePage"><p className='bg-indigo-500 p-2 rounded-lg fixed bottom-5 right-5'>Any Issue ?</p></Link>
        {ToIncludeHeadFoot && <Footer/>}
        
    </div>
  )
}

export default App
