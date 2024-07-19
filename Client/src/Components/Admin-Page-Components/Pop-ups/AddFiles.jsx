import React,{useState}from 'react'
import { useForm} from 'react-hook-form'
import axiousInstance from '../../../utils/AxiosInstance';
import { toast } from "react-toastify";

const AddFiles = ({removePopUp,_id}) => {
    
    const{handleSubmit,reset,register} = useForm();

    const AddFiles = async(data) =>{
      
        const formData = new FormData();

        for(let i = 0 ; i < data.StudyMaterial.length ; i++){
          formData.append('StudyMaterial',data.StudyMaterial[i]);
        }
        try {
            // handle the errors here properly
              const response = await axiousInstance.put(`Course/addFiles/${_id}`,
                formData,
                {headers : {"Content-Type" : "multipart/form-data"}}
              )

              toast.success("New Files have been added Successfully!");
              
        } catch (error) {
            // console.log(error)
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
