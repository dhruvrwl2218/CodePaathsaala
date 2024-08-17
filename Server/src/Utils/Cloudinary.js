import {v2 as cloudinary} from 'cloudinary';
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
        // console.log(result)
        fs.unlinkSync(filePath)
        // console.log(`mai cloud wala hu ${result.url}`)
        return result
    } catch (error) {
        fs.unlinkSync(filePath)
        // console.log('error while uploading files to the cloudinary')
        // console.log(error)
        return null
    }
  }
  export default uploadFilesCloudinary



  
// there is more to it add the HLS and dash url in the result for video format for the adaptive streaming on the client-side

//   const uploadResponse = await cloudinary.uploader.upload('path_to_video_file', {
//     resource_type: 'video',
//     folder: 'your_folder_name',
//     eager: [
//       { format: 'mp4', transformation: [{ width: 640, height: 480, crop: 'limit' }] }, // Optional: Convert to MP4
//       { format: 'm3u8', transformation: [{ width: 1280, height: 720, crop: 'limit' }] }, // Generate HLS
//       { format: 'mpd', transformation: [{ width: 1280, height: 720, crop: 'limit' }] } // Generate DASH
//     ]
//   });
  
//   const videoUrl = uploadResponse.secure_url;
//   const hlsUrl = uploadResponse.eager.find(e => e.format === 'm3u8').secure_url; // HLS URL
//   const dashUrl = uploadResponse.eager.find(e => e.format === 'mpd').secure_url; // DASH URL
//   const mp4Url = uploadResponse.eager.find(e => e.format === 'mp4').secure_url; // MP4 URL
  