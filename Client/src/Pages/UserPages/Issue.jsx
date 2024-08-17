import React, { useState } from "react";
import Accordion from "../../Components/User-Page-Components/Accordion";
import { MdOutlineMessage } from "react-icons/md";
import axiosInstance from "../../utils/AxiosInstance";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  Name: yup
    .string()
    .min(3, "at least 3 characters")
    .max(20, "maximum of 20 characters")
    .required("Name is required"),
  Email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  PhoneNo: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  Categories: yup
    .string()
    .oneOf(["Money", "Stream", "Enrollment", "Other"], "Select a valid option"),
  Message: yup
    .string()
    .test(
      'max-words',
      'Message must be 100 words or less',
      (value) => {
        if (!value) return true; // Allow empty field if not required
        const wordCount = value.split(/\s+/).filter(word => word).length;
        return wordCount <= 100;
      }
    )
});
const faqData = [
  {
    title: "I am unable to login. What should I do ?",
    content:
      "If you are unable to login, it may be due to incorrect email ID or a typing mistake. Please submit your query using the Support Form link and our team will respond within the next 48 hours.",
  },
  {
    title: "How can I join the Discord server after purchasing the course?",
    content:
      "To join the Discord server for CodeHelp, you will receive an email invitation containing a one-time invite link. This email will be sent to the email address associated with your CodeHelp account. Please monitor your inbox for this email.Once you receive the email, simply click on the one-time invite link provided. This link will redirect you to the Discord platform, where you can create a Discord account or log in to your existing account. After successful login, you will gain access to the CodeHelp Discord server.If you haven't received the email invitation, please ensure that you have checked your spam or junk folders. Sometimes, email providers may filter unfamiliar emails into these folders. If you still cannot locate the email, feel free to contact our support team for further assistance.",
  },
  {
    title:
      "I mistakenly bought the course and need a refund. What is the refund policy?",
    content:
      "As per the CodeHelp policy, we have a strict no refund and no cancellation policy.Refunds are only provided in cases where the course has not been allotted to you after payment.",
  },
  {
    title: "What should I do if I am facing a lag issue in video recordings?",
    content:
      "If you are experiencing a lag issue in video recordings, please create a screen recording of the issue you are facing and provide the details using the Support Form .Our team will review your submission and assist you accordingly.",
  },
  {
    title:
      "I am not financially strong, but I want to study from your courses. Is there any financial aid available?",
    content:
      "We have allocated a total of 50 seats for students who are facing financial constraints.You can apply for financial aid for the course by completing the application form Support Form.Please allow 7 business days for the response to your application, as our team will carefully review each submission.",
  },
];
const Issue = () => {
  
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const Contact = async(data) => {
    // console.log(data)
    try {
      const res = await axiosInstance.post("/Utility/ContactUs",data);
      console.log(res)
    } catch (error) {
      console.log('error:',error)
    }
  };

  return (
    <div className="text-white flex flex-wrap lg:flex-nowrap  max-lg:mx-5 mx-80 p-3 ">
      <div className="max-lg:w-full w-1/2 ">
        <h1 className="text-4xl py-10 m-2 font-bold text-indigo-500">
          Fequently Faced Issues
        </h1>
        <div>
          {faqData.map((item, index) => (
            <Accordion
              key={index}
              title={item.title}
              content={item.content}
              // isOpen={isOpen === index}
              // onClick={()=> handleToggle(index)}
            />
          ))}
        </div>
      </div>
      <div className=" max-lg:w-full w-1/2 bg-neutral-800 rounded-2xl">
        <div className="flex justify-between p-10">
          <p className="text-4xl  m-2 font-bold text-indigo-500 ">
            Contact Us
          </p>
          <p className="m-2">
            <MdOutlineMessage className="text-3xl m-2" />
          </p>
        </div>
        <form
          onSubmit={handleSubmit(Contact)}
          action=""
          className="flex flex-wrap gap-6 justify-between p-10 bg-neutral-800 text-white"
        >
          <div className="">
            <label htmlFor="Name" className="block">
              Name
            </label>
            <input
              type="text"
              id="Name"
              placeholder="Name"
              className="p-2 rounded-lg bg-black border w-64"
              {...register("Name")}
            />
            {errors.Name && <p className="text-xs text-red-700 text-left p-1">{errors.Name.message}</p>}
          </div>
          <div className="">
            <label htmlFor="Email" className="block">
              E-mail
            </label>
            <input
              type="text"
              id="Email"
              placeholder="Email"
              className="p-2 rounded-lg bg-black border w-64"
              {...register("Email")}
            />
            {errors.Email && <p className="text-xs text-red-700 text-left p-1">{errors.Email.message}</p>}
          </div>
          <div>
            <label htmlFor="Phone no" className="block">
              Phone No.
            </label>
            <input
              type="text"
              id="Phone No"
              placeholder="PhoneNo"
              className="p-2 rounded-lg bg-black border w-64"
              {...register("PhoneNo")}
            />
            {errors.PhoneNo && <p className="text-xs text-red-700 text-left p-1">{errors.PhoneNo.message}</p>}
          </div>
          <div>
            <label htmlFor="Categories" className="block">
              Categories
            </label>
            <select
              name="Categories"
              id="Categories"
              className="p-2 rounded-lg bg-black border w-64"
              {...register("Categories")}
            >
              <option value="Money">Monatary</option>
              <option value="Stream">Streaming</option>
              <option value="Enrollment">Enrollment</option>
              <option value="Other">Other</option>
            </select>
            {errors.Categories && <p className="text-xs text-red-700 text-left p-1">{errors.Categories.message}</p>}
          </div>
          <div className="w-full">
            <label htmlFor="Message" className="block ">
              Message
            </label>
            <input
              type="textbox"
              name="Message"
              className="p-2 rounded-lg w-full bg-black border"
              placeholder="Enter your message"
              {...register("Message")}
            />
            {errors.Message && <p className="text-xs text-red-700 text-left p-1">{errors.Message.message}</p>}
          </div>
          <div className="w-full text-center">
            <input
              type="submit"
              className="p-2 rounded-lg bg-indigo-600 w-1/2"
            />
          </div>
          <div className="text-center text-sm  p-2 w-full">
            <p><span className="font-bold">Email:</span><a href="#">support@CodePathsaala.com</a></p>
            <p> <span className="font-bold">Address:</span> CodePathsaala, Cubeway Avenue, Ahemdabad (Gujrat), CA 94043</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Issue;
