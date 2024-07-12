import React, { useState } from "react";
import { FaChevronCircleDown } from "react-icons/fa";
import { FaChevronCircleUp } from "react-icons/fa";

const Accordion = ({ content, title }) => {
  const [isOpen, setIsopen] = useState(false);

  const handleToggle = (e) => {
    if (isOpen) {
      setIsopen(false);
    } else {
      setIsopen(true);
    }
  };

  return (
    <div>
      <div className="p-2 bg-neutral-800 m-2 rounded-lg ">
        <button
          className="flex justify-between p-4 w-full  text-left"
          onClick={() => handleToggle()}
        >
          <p className="text-lg font-semibold">{title}</p>
          <p className="px-1 mx-3 rounded-full">
            {isOpen ? <FaChevronCircleUp /> : <FaChevronCircleDown />}
          </p>
        </button>
        {isOpen && <p className="p-1 m-2 text-left">{content}</p>}
      </div>
    </div>
  );
};

export default Accordion;
