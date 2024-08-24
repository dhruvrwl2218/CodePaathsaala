import mongoose from "mongoose";

 const DataBaseConnection = async() =>{
    try {
       const ConnectionInstance = await mongoose.connect(`${process.env.DB_URL}`)
        // console.log(`db connected to ${process.env.DB_URL}`)
        // console.log(ConnectionInstance);
    } catch (error) {
        // console.log(`Error while connecting to the Database ${error}`);
        process.exit(1);
    }
}
export default DataBaseConnection