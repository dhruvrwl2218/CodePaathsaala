import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";


import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

//for redux global states
import { Provider } from "react-redux";
import { store } from "./store/Store.js";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Auth
import {LogIn,SignIn,ResetPassword,ForgotPass} from "./Pages/Auth";

//Main pages with navigation
import{ Home,About,Courses,YourCourses,Issue} from "./Pages/UserPages";


import {AdminRoutes} from "./Components/Admin-Page-Components";
import RestrictedPath from "./Components/Restricted-Page-Components/RestrictedPath.jsx";
// import {EnrollmentSucess} from "./Components/User-Page-Components";

//Admin side components and pages
import {AddCourses,CourseList,EditCourse,AdminHome,EnrolledUserList} from "./Pages/AdminPages";

import {TermsOfServicePage,PrivacyPolicyPage,RefundPolicyPage,PageNF} from './Pages/other'

const publicRoutes = [
  <Route key="home" path="/" element={<Home />} />,
  <Route key="about" path="/About" element={<About />} />,
  <Route key="courses" path="/Courses" element={<Courses />} />,
  <Route key= "issuePage" path="/IssuePage" element={<Issue/>}/>,
];

const authRoutes = [
  <Route key="signin" path="/Signin" element={<SignIn />} />,
  <Route key="login" path="/Login" element={<LogIn />} />,
  <Route key="forgot-password" path="/Forgot-Password" element={<ForgotPass />} />,
  <Route key="reset-password" path="/Reset-Password/:token" element={<ResetPassword />} />,
];

const privateUserRoutes = [
  <Route key="your-courses" path="/YourCourses" element={<YourCourses />} />,
  // <Route key="success" path="/Success" element={<EnrollmentSucess />} />,
];

const adminRoutes = [
  <Route key="admin-home" path="/AdminHome" element={<AdminHome />} />,
  <Route key="add-courses" path="/AddCourses" element={<AddCourses />} />,
  <Route key="course-list" path="/CourseList" element={<CourseList />} />,
  <Route key="edit-course" path="/EditCourse/:_id" element={<EditCourse />} />,
  <Route key="enrolled-user" path="/EnrolledUser" element={<EnrolledUserList />} />,
];

const OtherRoutes = [
  <Route key="refund" path="/RefundPolicy" element={<RefundPolicyPage/>} />,
  <Route key="Privacy" path="/PrivacyPolicy" element={<PrivacyPolicyPage/>} />,
  <Route key="T&S" path="/Terms&services" element={<TermsOfServicePage/>} />,
]
const allRoutes = publicRoutes.concat(authRoutes, privateUserRoutes, adminRoutes, OtherRoutes);


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {publicRoutes}
      {authRoutes}
      {OtherRoutes}
      <Route element={<RestrictedPath />}>
        {privateUserRoutes}
      </Route>
      <Route element={<AdminRoutes />}>
        {adminRoutes}
      </Route>
      <Route path="/*" element = {<PageNF/>}/>
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
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
  //  {/* </React.StrictMode>  */}
);
