
import React from 'react'
import { IoIosCloseCircle } from "react-icons/io";


const PdfViewer = ({PdfUrl, CloseFiles}) => {
  return (
    <div className='w-3/4 h-full max-sm:w-full'>
      <div className='p-1 flex justify-end'>
       <IoIosCloseCircle className='size-10 pt-2 mr-12 right-8 bg-black'  
      onClick = {() => CloseFiles()}
      />
    </div>
      <embed src= {PdfUrl}
       type="application/pdf" 
       className='w-full h-full  my-5 '/>
    </div>
  )
}

export default PdfViewer

