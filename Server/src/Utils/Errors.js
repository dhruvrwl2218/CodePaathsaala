class ApiError extends Error {
    constructor(
        statuscode,
        message = "something went wrong",
        stack,
        error
    ){
        super(message)
        this.statuscode = statuscode
        this.data = null
        this.error = error
        
        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}
export{ApiError}