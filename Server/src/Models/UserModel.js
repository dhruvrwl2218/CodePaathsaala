import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const userschema = new Schema({
    FullName : {
        type : String,
        required : true,
    },
    Email : {
        type : String,
        required : true,
        unique : true,
    },
    Password : {
        type : String,
        required : true,
        unique : true,
        min : 8, 
    },
    Role :{
        type : String,
        default : "User"
    }, 
    // PhoneNumber:{
    //     type : String,
    //     validate: {
    //         validator: function(v) {
    //             // Example: Simple regex validation for a 10-digit phone number
    //             return /\d{10}/.test(v);
    //         },
    //         message: props => `${props.value} is not a valid phone number!`
    //     }
    // },
    refreshToken:{
        type: String,   
    },
    // EnrolledCourses :[{
    //     type : Schema.Types.ObjectId,
    //     ref:'Course'
    // }]
},
{
    timestamps:true
})

userschema.pre('save', async function(next){
    this.Password = await bcrypt.hash(this.Password,12)
    next()  
})

userschema.methods.PasswordCheck = async function(Password){
    return await bcrypt.compare(Password,this.Password);

//     console.log("pC" + Password)
//    try {
//      const result = await bcrypt.compare(Password,this.Password)
//      console.log(result)
//      return result;
//    } catch (error) {
//     console.log(error)
//     return error
//    }
}

userschema.methods.GenerateAccessToken = async function(){
   try {
    return jwt.sign({_id : this._id},
        process.env.ACCESS_TOKEN_KEY,
        {expiresIn:'1d'})
   } catch (error) {
        console.log(error)
   }
 }
 
 userschema.methods.GenerateRefreshToken = async function (){
 
      return jwt.sign({_id : this._id}, 
        process.env.REFRESH_TOKEN_KEY,
        {expiresIn:'15d'})
 
       
 }


export const User = mongoose.model("User",userschema)

