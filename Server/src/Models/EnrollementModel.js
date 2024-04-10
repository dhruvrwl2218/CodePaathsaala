import mongoose,{Schema} from "mongoose";


const EnrollementSchema = new Schema(
    {
        // Email : {
        //     type : String,
        //     required : true,
        //     unique : true
        // },
        User : {
            type : Schema.Types.ObjectId,
            ref : 'User',
        },
        Course : {
            type : Schema.Types.ObjectId,
            ref : 'Course'
        },
        // CourseDuration:{
        //     type : Number,
        // }
    },
    {
        timestamps : true,
    }
    
)
export const Enroll = mongoose.model("Enrollment",EnrollementSchema)

//here we have created this model for simplicity and scalabality as earlier we were passing the userid inside the course id and course id inside the 
//user who have enrolled in the particular course but we are making one seprate enrollement model as on admin side we can reflect 
//enrolled user directly and on filter with the user with the particular courses with the date of enrollment and other detials and
// on the completion of the date it should finctionality od deleting the user automatically.. 