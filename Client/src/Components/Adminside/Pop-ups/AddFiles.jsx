import React,{useState}from 'react'
import { useForm} from 'react-hook-form'
import axios from 'axios';
import { toast } from "react-toastify";

const AddFiles = ({removePopUp,api}) => {
    
    const{handleSubmit,reset,register} = useForm();

    // console.log(_id + removePopUp);

  
    const AddFiles = async(data) =>{
      
        // console.log(data.StudyMaterial)
        // console.log(data.StudyMaterial.length)
        const formData = new FormData();

        for(let i = 0 ; i < data.StudyMaterial.length ; i++){
          // console.log(data.StudyMaterial[i])
          formData.append('StudyMaterial',data.StudyMaterial[i]);
        }
        try {
            const response = await axios.put(`${api}`,formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
              })
              console.log(response);
              toast.success("New Files have been added Successfully!");
              
        } catch (error) {
            console.log(error)
            toast.error("Error while Adding Files :(..")
           
        }
        reset();
        removePopUp();

    }
  return (
    <div className = 'p-8 bg-black text-white border rounded-md '>
        <div className="flex justify-end ">
            <button className='bg-slate-300 text-black p-2 rounded-sm' onClick={()=>removePopUp()}>X</button>
        </div>
      <form onSubmit={handleSubmit(AddFiles)} encType="multipart/form-data" className='border p-4 m-2 flex-col rounded-sm'>
            <label htmlFor="files" className='text-2xl'> <span className='mr-4'>Add Files Here : </span>
                <input type="file" name='StudyMaterial'  id="files" multiple {...register("StudyMaterial",{ required: true })} /></label>
            <input type="submit" value="submit" className='bg-blue-600 p-2 rounded-lg'/>
            <p className='py-4'>Max 5 files can be sent at Once..</p>
      </form>
    </div>
  ) 
}

export default AddFiles
