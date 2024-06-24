import React,{useState} from "react";
import Accordion from "../../Components/User-Page-Components/Accordion";
import { MdOutlineMessage } from "react-icons/md";

const faqData = [
    {title:"kuch bhi puch lett kys hi farak penda hai",
     content:"we will be back to you after a while beacause we does'nt care about your problem you just enroll in course in give us money that's all matters"
    },
    {title:"kuch bhi puch lett kys hi farak penda hai",
    content:"we will be back to you after a while beacause we does'nt care about your problem you just enroll in course in give us money that's all matters"
    },
    {title:"kuch bhi puch lett kys hi farak penda hai",
    content:"we will be back to you after a while beacause we does'nt care about your problem you just enroll in course in give us money that's all matters"
    },
    {title:"kuch bhi puch lett kys hi farak penda hai",
    content:"we will be back to you after a while beacause we does'nt care about your problem you just enroll in course in give us money that's all matters"
    },
    {title:"kuch bhi puch lett kys hi farak penda hai",
    content:"we will be back to you after a while beacause we does'nt care about your problem you just enroll in course in give us money that's all matters"
    }
]
const Issue = () => {
    const[isOpen,setIsopen] = useState(null);

    const handleToggle = (index) => {
        setIsopen(open === index ? null : index);
    }

  return (
    <div className="text-white flex flex-wrap lg:flex-nowrap  max-lg:mx-5 mx-80 p-3 ">
      <div className="max-lg:w-full w-1/2 ">
        <h1 className="text-4xl py-10 m-2 font-bold text-indigo-500">Fequently Faced Issues</h1>
        <div>
            {faqData.map((item,index)=>(
                <Accordion
                key={index}
                title={item.title}
                content={item.content}
                isOpen={isOpen === index}
                onClick={()=> handleToggle(index)}/>
            ))}
        </div>
      </div>
      <div className=" max-lg:w-full w-1/2 bg-neutral-800 rounded-2xl">
        <div className="flex justify-between p-10">
            <p className="text-4xl  m-2 font-bold text-indigo-500 ">Send Message</p>
            <p className="m-2"><MdOutlineMessage className="text-3xl m-2"/></p>
        </div>
       <form action="" className="flex flex-wrap gap-6 justify-between p-10 bg-neutral-800 text-white">
        <div className="">
            <label htmlFor="name" className="block">Name</label>
            <input type="text" id="name" placeholder="Name" className="p-2 rounded-lg bg-black border w-64"/>
        </div>
        <div className="">
            <label htmlFor="email" className="block">E-mail</label>
            <input type="text" id="email" placeholder="Name" className="p-2 rounded-lg bg-black border w-64"/>
        </div>
        <div>
            <label htmlFor="Phone no" className="block">Phone No.</label>
            <input type="text" id="Phone no" placeholder="phone no." className="p-2 rounded-lg bg-black border w-64"/>
        </div>
        <div>
            <label htmlFor="categories" className="block">Categories</label>
             <select name="categories" id="categories" className="p-2 rounded-lg bg-black border w-64">
                <option value="Money">Monatary</option>
                <option value="stream">Streaming</option>
                <option value="Enrollment">Enrollment</option>
             </select>
        </div>
        <div className="w-full">
            <label htmlFor="message" className="block ">Message</label>
            <input type="textbox" className="p-2 rounded-lg w-full bg-black border" placeholder="Enter your message"/>
        </div>
        <div className="w-full text-center">
            <input type="submit" className="p-2 rounded-lg bg-indigo-600 w-1/2" />
        </div>

    
       </form>
    
      </div>
    </div>
  );
};

export default Issue;
