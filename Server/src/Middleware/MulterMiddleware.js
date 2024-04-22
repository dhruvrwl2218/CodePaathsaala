import multer from "multer"

const storage = multer.diskStorage({
    destination:function(req,file,cb){
       
        if(file.fieldname === "Thumbnail"){
            cb(null,"./public/img")
        }else if(file.fieldname === "StudyMaterial"){
            cb(null,'./public/assests')
        } 
    },
    filename:function(req,file,cb){
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
         cb(null,file.originalname) 
    }
}) 
export const upload = multer({ 
    storage : storage,
       
 })
// export const uploadDocs = multer({ 
//     storage : storageDocs,
//  })


// const storageDocs = multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,"./temp/pdf")
//     },
//     filename:function(req,file,cb){
//         // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null,file.originalname) 
//     }
// })