import mongoose,{Schema} from "mongoose";

const ContactUsSchema = new Schema(
    {
        Name : {
            type : String,
            required : true,
        },
        Email :{
            type : String,
            required : true,
        },
        PhoneNo : {
            type : String,
            required : true,
        },
        Categories :{
            type : String,
        },
        Message :{
            type : String,
            required : [true,"Message is required"],
        }
    },
    {
        timestamps : true
    }
)
export const ContactUs = mongoose.model("ContactUs",ContactUsSchema)