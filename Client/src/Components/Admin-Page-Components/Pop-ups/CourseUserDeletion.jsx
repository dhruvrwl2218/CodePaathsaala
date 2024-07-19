import React from 'react'
import axiousInstance from '../../../utils/AxiosInstance';
import { toast } from "react-toastify";

const CourseUserDeletion = ({removePopUp,_id}) => {
    
    const deleteItem = async () => {
        try {
         const res = await axiousInstance.delete(`Course/remove/${_id}`);

      if(res.status === 200){
        toast.success("Items delted successfully!");
        
      }else{
        toast.error(res.error)
      }
    } catch (error) {
      // console.log(error)
      toast.error(res.error)
    }
    removePopUp();
    }
  return (
    <div className='flex w-64 flex-wrap p-8  text-white border  bg-black shadow-lg '>
      <p>Are you sure you want to delete this Item?</p>
      <div className='flex justify-between p-4 w-full'>
        <button onClick={()=> deleteItem() } className='bg-red-500 p-1 rounded-lg px-3'>Yes</button>
        <button onClick={()=>removePopUp()}  className='bg-green-500 p-1 rounded-lg px-3'>No</button>
      </div>
    </div>
  )
}

export default CourseUserDeletion
