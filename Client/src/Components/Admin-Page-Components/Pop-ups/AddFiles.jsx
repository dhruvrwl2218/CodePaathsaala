import * as Yup from 'yup';
import { useForm} from 'react-hook-form'
import axiousInstance from '../../../utils/AxiosInstance';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = Yup.object().shape({
  files: Yup.mixed()
    .test(
      'max-files',
      'You can upload up to 5 files only',
      (value) => {
        if (!value) return true; // No files selected, so no need to validate
        return value.length <= 5; // Validate that the array has 5 or fewer files
      }
    )
    .required('Files are required'),
});

const AddFiles = ({removePopUp,_id}) => {
    
    const{handleSubmit,reset,register,formState:{errors}} = useForm({
        resolver:yupResolver(validationSchema),
    });
//add the valdation for the form here 
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
              console.log('file add success ',response)
              reset();
              removePopUp()      
        } catch (error) {
            console.log('error while add files :',error)           
        }
        reset();
        removePopUp()
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
            {errors.files && <p>{errors.files.message}</p>}
      </form>
    </div>
  ) 
}

export default AddFiles
