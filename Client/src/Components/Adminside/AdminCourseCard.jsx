import React from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import {useNavigate} from "react-router-dom";
const AdminCourseCard = ({
  className = "",
  Name,
  Description,
  Level,
  Img,
  Duration,
  Price,
  _id,
  ...props
}) => {
const Navigate = useNavigate();
const EditIt = (_id)=>{
Navigate(`/EditCourse/${_id}`)
}
  // const Edit (e) =>{
  //   e.target.Key
  // }
  return (
    <tr className="p-2 text-lg max-h-10 bg-neutral-900 max-sm:text-sm border"
    // style={{ boxShadow:'0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'}}
    >
      <td className="w-1/4  "><img className="w-1/2 h-auto rounded-xl m-2" src={Img} alt="" /></td>
      <td className="w-1/6 text-wrap text-center ">{Name}</td>
      <td className="w-1/8 text-center ">{Level}</td>
      <td className="text-center ">{Duration}</td>
      <td className="text-center">{Price}</td>
      <td className="text-center"><button>
          <div
            className="p-1 m-1 rounded-lg"
            style={{
              backgroundColor: "#1c1c1c",
            }}
          >
           <MdEdit
              className="w-8 h-auto p-1"
              style={{
                color: "#bd1414",
              }}
              onClick={()=> EditIt(_id)}
            />
          </div>
        </button></td>
      <td className="text-center">{  <button>
          <div
            className="p-1 m-1 rounded-lg"
            style={{
              backgroundColor: "#1c1c1c",
            }}
          >
            <MdDelete
              className="w-8 h-auto p-1"
              style={{
                color: "#bd1414",
              }}
            />
          </div>
        </button>}</td>
        
    </tr>
  )
};

export default AdminCourseCard;



{/* <div className="w-full text-white border-2 m-3 rounded-xl bg-neutral-900 p-4 flex flex-col" {...props}>
      
      <div>
        <button>
          <div
            className="p-1 m-1 rounded-lg"
            style={{
              backgroundColor: "#1c1c1c",
            }}
          >
           <MdEdit
              className="w-8 h-auto p-1"
              style={{
                color: "#bd1414",
              }}
              onClick={()=> EditIt(_id)}
            />
          </div>
        </button>
        <button>
          <div
            className="p-1 m-1 rounded-lg"
            style={{
              backgroundColor: "#1c1c1c",
            }}
          >
            <MdDelete
              className="w-8 h-auto p-1"
              style={{
                color: "#bd1414",
              }}
            />
          </div>
        </button>
      </div>
      <div id="" className="">
        {Name}
      </div>
      <p>{Description}</p>
      <p>{Level}</p>
      <p>{Duration}</p>
      <p>{Price}</p>
  
    </div> */}