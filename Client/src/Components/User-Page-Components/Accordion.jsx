import React from 'react'
import { FaChevronCircleDown } from "react-icons/fa";
// import { GoChevronUp } from "react-icons/go";

const Accordion = ({onClick,isOpen,content,title}) => {
  return (
    
    <div>
      <div className="p-2 bg-neutral-800 m-2 rounded-lg ">
            <button className="flex justify-between p-4 w-full" onClick={onClick}>
            <p className='text-lg font-semibold'>{title}</p>
            <p className=' px-1 mx-3 rounded-full'>{isOpen ? "": <FaChevronCircleDown />}</p>
            </button>
            {isOpen && <p className='p-1 m-2'>{content}</p>}
        </div>
    </div>
    
  )
}

export default Accordion
 