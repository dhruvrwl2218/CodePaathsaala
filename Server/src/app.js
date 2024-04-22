import express  from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./Routes/UserRoutes.js"
import CourseRouter from "./Routes/CourseRoutes.js"
import EnrollRouter from "./Routes/EnrollementRoutes.js"
const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    // methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    credentials: true, // Allow credentials (cookies)
    exposedHeaders: [], // Expose these headers to the client
    maxAge: 86400, // Cache preflight requests for 1 day
    

}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

 
 
app.post('/',(req,res,)=>{
    
    console.log(req.body)
    const {data}= req.body;
    console.log(data)
    res.send('arre deewano mujhe pehchano...')
})


//Routes 

app.use("/api/v1/user",userRouter)
app.use("/api/v1/Course",CourseRouter)
app.use("/api/v1/Enroll",EnrollRouter)


export {app}