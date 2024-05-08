import React from 'react'
import { toast } from 'react-toastify';
const UserNotAllowed = () => {
  return (
    <div>
     {
        toast.warn("Only Admin's are allowed to this path")
        
     }
     <h1>user NOt allowed</h1>
    </div>
  )
}

export default UserNotAllowed
