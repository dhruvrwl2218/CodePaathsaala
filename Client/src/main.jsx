import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Auth
import LogIn from "./Pages/Auth/LogIn.jsx";
import SignIn from "./Pages/Auth/SignIn.jsx";
import ResetPassword from "./Pages/Auth/ResetPassword.jsx";
import ForgotPass from "./Pages/Auth/ForgotPass.jsx";


//Main pages with navigation
import Home from "../src/Pages/Home.jsx";
import About from "./Pages/About.jsx";
import Courses from "./Pages/Courses.jsx";
import YourCourses from "./Pages/YourCourses.jsx";


import AdminRoutes from "./Components/Adminside/AdminRoutes.jsx";
import RestrictedPath from "./Components/RestrictedPath.jsx";
import EnrollementSucess from "./Components/EnrollementSucess.jsx";

//for redux global states
import { Provider } from "react-redux";
import { store } from "./store/Store.js";



//Admin side components and pages
import AddCourses from "./Components/Adminside/AddCourses.jsx";
import CourseList from "./Components/Adminside/CourseList.jsx";
import EditCourse from "./Components/Adminside/EditCourse.jsx";
import AdminHome from "./Components/Adminside/AdminHome.jsx";
import EnrolledUserList from "./Components/Adminside/EnrolledUserList.jsx";

const publicRoutes = [
  <Route key="home" path="/" element={<Home />} />,
  <Route key="about" path="/About" element={<About />} />,
  <Route key="courses" path="/Courses" element={<Courses />} />,
];

const authRoutes = [
  <Route key="signin" path="/Signin" element={<SignIn />} />,
  <Route key="login" path="/Login" element={<LogIn />} />,
  <Route key="forgot-password" path="/Forgot-Password" element={<ForgotPass />} />,
  <Route key="reset-password" path="/Reset-Password/:token" element={<ResetPassword />} />,
];

const privateUserRoutes = [
  <Route key="your-courses" path="/YourCourses" element={<YourCourses />} />,
  <Route key="success" path="/Success" element={<EnrollementSucess />} />,
];

const adminRoutes = [
  <Route key="admin-home" path="/AdminHome" element={<AdminHome />} />,
  <Route key="add-courses" path="/AddCourses" element={<AddCourses />} />,
  <Route key="course-list" path="/CourseList" element={<CourseList />} />,
  <Route key="edit-course" path="/EditCourse/:_id" element={<EditCourse />} />,
  <Route key="enrolled-user" path="/EnrolledUser" element={<EnrolledUserList />} />,
];

const allRoutes = publicRoutes.concat(authRoutes, privateUserRoutes, adminRoutes);


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {publicRoutes}
      {authRoutes}
      <Route element={<RestrictedPath />}>
        {privateUserRoutes}
      </Route>
      <Route element={<AdminRoutes />}>
        {adminRoutes}
      </Route>
    </Route>
  )
);


// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       {/* these are public routes */}

//       <Route path="/" element={<Home />} />
//       <Route path="/About" element={<About />} />
//       <Route path="/Courses" element={<Courses />} />

//        {/* Auth routes */} 
//       <Route path="/Signin" element={<SignIn />} />
//       <Route path="/Login" element={<LogIn />} />
//       <Route path="/Forgot-Password" element={<ForgotPass />}></Route>
//       <Route path="/Reset-Password/:token" element={<ResetPassword />}></Route>

//       {/* //these are private routes for the user ..log in is needed for this  */}
//       <Route element={<RestrictedPath />}>
//         <Route path="/YourCourses" element={<YourCourses />} />
//         <Route path="/Sucess" element={<EnrollementSucess />}></Route>
//       </Route>

//       {/* admin side component  */}
//       <Route element={<AdminRoutes />}>
//         <Route path="/AdminHome" element={<AdminHome />}></Route>
//         <Route path="/AddCourses" element={<AddCourses />} />
//         <Route path="/CourseList" element={<CourseList />} />
//         <Route path="/EditCourse/:_id" element={<EditCourse />}></Route>
//         <Route path="/EnrolledUser" element = {<EnrolledUserList/>}></Route>
//       </Route>
//     </Route>
//   )
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        autoClose={5000}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

{
  /* <Router>
      <Routes>
       
        <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/LogIn" element={<LogIn />} />

        <Route path="/RestrictedPath" element={<RestrictedPath />}>
          <Route path="YourCourses" element={<YourCourses />} />
        </Route>

        <Route path="/AdminPath" element={<AdminRoutes />}>
          <Route path="AddCourses" element={<AddCourses />} />
        </Route>

      </Route>

      </Routes>
   </Router> */
}

{
  /* <RouterProvider router={router}/> */
}

// const Router = createBrowserRouter([
//   {
//   path:'/',
//   element: <App/>,
//   children:[
//     {
//       path:'/',
//       element : <Home/>
//     },
//     {
//       path : '/About',
//       element : <About/>
//     },
//     {
//       path : '/Courses',
//       element : <Courses/>
//     },
//     {
//       path : '/YourCourses',
//       element : <YourCourses/>
//     }
//     ,{
//       path : '/Add',
//       element : <AddCourses/>
//     },
//   ],
// },
// {
//   path : 'Signin',
//   element : <SignIn/>
// },
// {
//   path : 'Login',
//   element : <LogIn/>
// }
// ])

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element = {<App/>}>

//       {/* these are public routes */}

//       <Route path='/' element = {<Home/>}/>
//       <Route path='/About' element = {<About/>}/>
//       <Route path='/Courses' element = {<Courses/>}/>
//       <Route path = '/Signin' element = {<SignIn/>}/>
//       <Route path = '/Login' element = {<LogIn/>}/>

//       {/* //these are private routes for the user ..log in is needed for this  */}
//       <Route path='/RestricrtedPath' element={<RestrictedPath/>}>
//           <Route path='/YourCourses' element = {<YourCourses/>}/>
//       </Route>

//       {/* admin side component  */}
//       <Route path='/AdminPath' element = {<AdminRoutes/>}>
//           <Route path='/AddCourses' element = {<AddCourses/>}/>
//       </Route>

//     </Route>

// )

// )
