import mongoose from "mongoose";

const mongoTransaction = async(transactionalFunction) =>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const result = await transactionalFunction(session);
        console.log("Result aagya",result)
        await session.commitTransaction();
        return result;
    } catch (error) {
        console.log("error : ",error)
        await session.abortTransaction();
        throw error;
    }finally{
        session.endSession();
    } 
}
export default mongoTransaction;