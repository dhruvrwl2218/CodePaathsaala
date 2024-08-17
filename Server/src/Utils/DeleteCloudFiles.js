import {v2 as cloudinary} from 'cloudinary';

const deleteCloudinaryFile = async(secureUrl) =>{
    try{
        const publicId = extractPublicId(secureUrl);

        if(!publicId){
            throw new Error('failed to extract public ID from URL')
        }
        const result = await cloudinary.uploader.destroy(publicId);

        console.log(publicId,result)
        if(result.result !== 'ok'){
            throw new Error(`Failed to delete the file : ${result.result}`)
        }
        return {success : true,message : "File deleted Successfully."}
    }catch(error){
        console.log(error)
        return {success : false , message : error.message}
    }
}
const extractPublicId = (secureUrl) =>{
    const parts = secureUrl.split('/');
    const fileWithExtension = parts[parts.length-1];

    const publicId = fileWithExtension.split('.')[0];

    parts[parts.length-1] = publicId;

    return parts.slice(7).join('/');
}

export default deleteCloudinaryFile;