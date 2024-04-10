import {v2 as cloudinary} from 'cloudinary';
import { response } from 'express';
import fs from "fs"
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET, 
  });

  const uploadFilesCloudinary = async (filePath) =>{
    try {
        if(!filePath){
            return null
        }
       const result =  await cloudinary.uploader.upload(filePath, {
            resource_type: "auto"
        })
        console.log(result)
        fs.unlinkSync(filePath)
        console.log(`mai cloud wala hu ${result.url}`)
        return result
    } catch (error) {
        fs.unlinkSync(filePath)
        console.log('error while uploading files to the cloudinary')
        console.log(error)
        return null
    }
  }
  export default uploadFilesCloudinary