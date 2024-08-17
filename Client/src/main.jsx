import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import { store } from "./store/Store.js";

// Toast
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Regular imports for frequently visited pages (no lazy loading)
import Home from "./Pages/UserPages/Home";
import About from "./Pages/UserPages/About";
import Courses from "./Pages/UserPages/Courses";
import YourCourses from "./Pages/UserPages/YourCourses";
import Issue from "./Pages/UserPages/Issue";
import PageNF from './Pages/other/PageNF';
import Loading from "./Pages/other/Loading.jsx";
// Lazy load for less frequently visited or heavier components
const LogIn = lazy(() => import("./Pages/Auth/LogIn"));
const SignIn = lazy(() => import("./Pages/Auth/SignIn"));
const ResetPassword = lazy(() => import("./Pages/Auth/ResetPassword"));
const ForgotPass = lazy(() => import("./Pages/Auth/ForgotPass"));

// Lazy load admin pages
const AdminHome = lazy(() => import("./Pages/AdminPages/AdminHome"));
const AddCourses = lazy(() => import("./Pages/AdminPages/AddCourses"));
const CourseList = lazy(() => import("./Pages/AdminPages/CourseList"));
const EditCourse = lazy(() => import("./Pages/AdminPages/EditCourse"));
const EnrolledUserList = lazy(() => import("./Pages/AdminPages/EnrolledUserList"));

// Lazy load other pages
const TermsOfServicePage = lazy(() => import('./Pages/other/TermsOfServicePage'));
const PrivacyPolicyPage = lazy(() => import('./Pages/other/PrivacyPolicyPage'));
const RefundPolicyPage = lazy(() => import('./Pages/other/RefundPolicyPage'));

// Route Components
import RestrictedPath from "./Components/Restricted-Page-Components/RestrictedPath.jsx";
import { AdminRoutes } from "./Components/Admin-Page-Components";

// // Fallback Component for Suspense
// const LoadingFallback = <div className="flex justify-center top-40">
//                           <img src="/loading.gif" alt="Loading..." />
//                         </div>;

const publicRoutes = [
  <Route key="home" path="/" element={<Home />} />,
  <Route key="about" path="/About" element={<About />} />,
  <Route key="courses" path="/Courses" element={<Courses />} />,
  <Route key="issuePage" path="/IssuePage" element={<Issue />} />,
];

const authRoutes = [                                        //in case in future wanted to add the suspense for the individual pages
  <Route key="signin" path="/Signin" element={
    <Suspense fallback={<Loading styling={""}/>}>
      <SignIn />
    </Suspense>
  } />,
  <Route key="login" path="/Login" element={
    <Suspense fallback={<Loading styling={""}/>}>
      <LogIn />
    </Suspense>
  } />,
  <Route key="forgot-password" path="/Forgot-Password" element={
    <Suspense fallback={<Loading styling={""}/>}>
      <ForgotPass />
    </Suspense>
  } />,
  <Route key="reset-password" path="/Reset-Password/:token" element={
    <Suspense fallback={<Loading styling={""}/>}>
      <ResetPassword />
    </Suspense>
  } />,
];

const privateUserRoutes = [
  <Route key="your-courses" path="/YourCourses" element={<YourCourses />} />,
];

const adminRoutes = [
  <Route key="admin-home" path="/AdminHome" element={
    <Suspense fallback={<Loading styling={"w-3/5"}/>}>
      <AdminHome />
    </Suspense>
  } />,
  <Route key="add-courses" path="/AddCourses" element={
    <Suspense fallback={<Loading styling={"w-3/5"}/>}>
      <AddCourses />
    </Suspense>
  } />,
  <Route key="course-list" path="/CourseList" element={
    <Suspense fallback={<Loading styling={"3/5"}/>}>
      <CourseList />
    </Suspense>
  } />,
  <Route key="edit-course" path="/EditCourse/:_id" element={
    <Suspense fallback={<Loading styling={"3/5"}/>}>
      <EditCourse />
    </Suspense>
  } />,
  <Route key="enrolled-user" path="/EnrolledUser" element={
    <Suspense fallback={<Loading styling={"3/5"}/>}>
      <EnrolledUserList />
    </Suspense>
  } />,
];

const OtherRoutes = [
  <Route key="refund" path="/RefundPolicy" element={
    <Suspense fallback={<Loading styling={"min-h-screen"}/>}>
      <RefundPolicyPage />
    </Suspense>
  } />,
  <Route key="Privacy" path="/PrivacyPolicy" element={
    <Suspense fallback={<Loading styling={"min-h-screen"}/>}>
      <PrivacyPolicyPage />
    </Suspense>
  } />,
  <Route key="T&S" path="/Terms&services" element={
    <Suspense fallback={<Loading styling={"min-h-screen"}/>}>
      <TermsOfServicePage />
    </Suspense>
  } />,
];

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
      <Route path="/*" element={<PageNF />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
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
      transition={Bounce}
    />
    <RouterProvider router={router} />
  </Provider>
);































// import React, { Children } from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";


// import {
//   Route,
//   createBrowserRouter,
//   createRoutesFromElements,
//   RouterProvider,
// } from "react-router-dom";

// //for redux global states
// import { Provider } from "react-redux";
// import { store } from "./store/Store.js";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// //Auth
// import {LogIn,SignIn,ResetPassword,ForgotPass} from "./Pages/Auth";

// //Main pages with navigation
// import{ Home,About,Courses,YourCourses,Issue} from "./Pages/UserPages";


// import {AdminRoutes} from "./Components/Admin-Page-Components";
// import RestrictedPath from "./Components/Restricted-Page-Components/RestrictedPath.jsx";
// // import {EnrollmentSucess} from "./Components/User-Page-Components";

// //Admin side components and pages
// import {AddCourses,CourseList,EditCourse,AdminHome,EnrolledUserList} from "./Pages/AdminPages";

// import {TermsOfServicePage,PrivacyPolicyPage,RefundPolicyPage,PageNF} from './Pages/other'

// const publicRoutes = [
//   <Route key="home" path="/" element={<Home />} />,
//   <Route key="about" path="/About" element={<About />} />,
//   <Route key="courses" path="/Courses" element={<Courses />} />,
//   <Route key= "issuePage" path="/IssuePage" element={<Issue/>}/>,
// ];

// const authRoutes = [
//   <Route key="signin" path="/Signin" element={<SignIn />} />,
//   <Route key="login" path="/Login" element={<LogIn />} />,
//   <Route key="forgot-password" path="/Forgot-Password" element={<ForgotPass />} />,
//   <Route key="reset-password" path="/Reset-Password/:token" element={<ResetPassword />} />,
// ];

// const privateUserRoutes = [
//   <Route key="your-courses" path="/YourCourses" element={<YourCourses />} />,
//   // <Route key="success" path="/Success" element={<EnrollmentSucess />} />,
// ];

// const adminRoutes = [
//   <Route key="admin-home" path="/AdminHome" element={<AdminHome />} />,
//   <Route key="add-courses" path="/AddCourses" element={<AddCourses />} />,
//   <Route key="course-list" path="/CourseList" element={<CourseList />} />,
//   <Route key="edit-course" path="/EditCourse/:_id" element={<EditCourse />} />,
//   <Route key="enrolled-user" path="/EnrolledUser" element={<EnrolledUserList />} />,
// ];

// const OtherRoutes = [
//   <Route key="refund" path="/RefundPolicy" element={<RefundPolicyPage/>} />,
//   <Route key="Privacy" path="/PrivacyPolicy" element={<PrivacyPolicyPage/>} />,
//   <Route key="T&S" path="/Terms&services" element={<TermsOfServicePage/>} />,
// ]
// const allRoutes = publicRoutes.concat(authRoutes, privateUserRoutes, adminRoutes, OtherRoutes);


// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       {publicRoutes}
//       {authRoutes}
//       {OtherRoutes}
//       <Route element={<RestrictedPath />}>
//         {privateUserRoutes}
//       </Route>
//       <Route element={<AdminRoutes />}>
//         {adminRoutes}
//       </Route>
//       <Route path="/*" element = {<PageNF/>}/>
//     </Route>
//   )
// );


// ReactDOM.createRoot(document.getElementById("root")).render(
//   // <React.StrictMode>
//     <Provider store={store}>
//       <ToastContainer
//         position="top-right"
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         autoClose={5000}
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//         transition:Bounce
//       />
//       <RouterProvider router={router} />
//     </Provider>
//   //  {/* </React.StrictMode>  */}
// );
