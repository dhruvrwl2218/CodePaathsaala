import 'dotenv/config'
import DataBaseConnection from "./DbConnect.js";
import {app} from "./app.js"

DataBaseConnection()
.then(()=>{
    app.listen(process.env.PORT || 8000)
    console.log("mongo Db connected successfully")
    // console.log(`app is listing to port ${process.env.PORT}`)
})
.catch((error)=>{
    console.log(`Error in mongo Connection ${error}`)
})

 