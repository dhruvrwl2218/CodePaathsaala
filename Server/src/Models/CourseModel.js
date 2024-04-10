import mongoose ,{Schema} from "mongoose";


const CourseSchema = new Schema(
    {
        Name : {
            type : String,
            required: true,
            unique: true,
        },
        Duration :{
            type : String,
        },
        CourseId : {
            type :String,
            required: true,
            unique: true,
        },
        Thumbnail: {
            type: String,
            required: true,
        },  
        StudyMaterial: [
            {
                FileName : {type : String},
                FileUrl : {type : String},
            }
        ],
        Level : {
            type : String,
            required: true,    
            enum: ['Beginner', 'Intermediate', 'Advance'],
        },
        Description : {
            type : String,
            required: true,
            maxLength:500,
        },
        Price:{
            type :String
        },
    //    EnrolledUser : [{
    //     type : Schema.Types.ObjectId,
    //     ref:'User',
    //    }]
    },
    {
        timestamps: true
    }
    
)

 export const Course = mongoose.model("Course",CourseSchema)