import React from "react";
// import {loadStripe} from "@stripe/stripe-js"
import axios from "axios";

const Coursecard = ({
  Name,
  Css = "", 
  Level,
  Img,
  Duration,
  Price,
  Description,
  _id,
  checkout,
  ...props
}) => {
  
  return (
   <div className={`flex flex-col bg-black text-white gap-2 p-3 rounded-xl m-3  font-serif text-semibold ${Css}
   border border-slate-600 `}>
    <div>
      <img src={Img} alt="thumbnail" className="rounded-xl w-full border-indigo-100" />
    </div>
    <div>
      <p className="text-2xl p-2 text-indigo-400 font-semibold">{Name} ({Level})</p>
    </div>
    <div className="flex justify-between px-3 text-xl my-1">
      <p >Duration : {Duration}</p>
      <p >₹ {Price?Price:1000}</p>
    </div>
    {/* <div className="hidden sm:block">
      Description : {Description}
    </div> */}
    <button className = "bg-neutral-800 rounded-lg mx-4 py-1 border border-slate-600" onClick={()=>checkout(Price,_id,)}>Buy</button>
    </div>
   
  )
}
export default Coursecard;


  // const Course = {
  //   Name : Name,
  //   Price : Price,
  // }
// const MakePayment = async() => {
  //     const stripe = await loadStripe("pk_test_51OuA71SFBBJV2fWwwZGzpjZnf1e95OHHGgL5FNuzlmJHUQIqDeRThdwqKwkKoY6PkYgq9uPwFb0LHXPZKBJrgU5l00y7ljzlM7")
  //     console.log(Course)
  //      const response = await axios.post("http://localhost:8000/api/v1/Course/checkout-session",Course,{ withCredentials: true })

  //     const session = await response.data;

  //     const result = stripe.redirectToCheckout({
  //       sessionId : session.id
  //     });

  //     if(result.error){
  //       console.log(result.error)
  //     }
  // }
{/* <div className={` flex flex-col rounded-2xl bg-black text-white m-2 p-4 ${Css} hover:cursor-pointer border-2 border-l-2
border-y-4 shadow-md shadow-blue-600`}
>
 <img src={Img} alt="thumbnail" className="w-full rounded-xl" />
 <p className="text-2xl text-center mt-1 text-indigo-300 semi-bold">{Name}  ({Level})</p>
 

 <div className="flex justify-around p-1">
 <p className=" ">Duration : {Duration}</p>
 <p>Price: {Price}1000</p>
 </div>
 
);
}; */}