import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const EnrollmentSucess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
      const loc = new URLSearchParams(location.search);
      const paymentRef = loc.get("refrence");

      handlepaymentSuccess(paymentRef);
    },[location.search]);

  const handlepaymentSuccess = async (paymentRef) => {
    const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = paymentRef;
    const paymentVerify = paymentRef;
    const enrolldata = localStorage.getItem(JSON.parse("EnrollUser"));
    console.log(enrolldata + "");
    const enrollmentData = {...enrolldata,...paymentVerify};
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/Enroll/EnrollUser",
        enrollmentData
      );

      if (res.status === 200) {
        toast.sucess("Enrollment sucessfull and transacation completed!!");
        navigate("/YourCourses");
      }
    } catch (error) {
      console.log(error);
      toast.error("Issue while enrolling ,transaction has been completed,,");
    }
  };

  return <div className="">
    <div className="rounded-full w-32 bg-green-800">
        <p className="text-2xl text-white">Success</p>
    </div>
    <p>Payment and Enrollment Successfull</p>
    <p>Payment_id = {} </p>

  </div>;
};

export default EnrollmentSucess;
