
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


// import { useState } from 'react';
// import { Document, Page } from 'react-pdf';
// import { IoIosCloseCircle } from "react-icons/io";
// // import File.pdf from '../../../public'


// const PdfViewer = ({PdfUrl, CloseFiles})=> {
//   console.log(PdfUrl)
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   function onDocumentLoadSuccess({ numPages }){
//     setNumPages(numPages);
//   } 

//   return (
//     <div className='w-3/4'>
//       <div>
//       <IoIosCloseCircle  className='size-8 mx-2 pt-2 mr-12 right-8' 
//       onClick = {() => CloseFiles()}
//        />
//      </div>
//       <Document file = {PdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
//         <Page pageNumber={pageNumber} />
//       </Document>
//       <p>
//         Page {pageNumber} of {numPages}
//       </p>
//     </div>
//   );
// }
// export default PdfViewer

// import React from 'react'
// import { IoIosCloseCircle } from "react-icons/io";
// import { pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();

// const PdfViewer = ({PdfUrl, CloseFiles}) => {
//   console.log(PdfUrl)
//   return (
//     <div>
//      <IoIosCloseCircle  className='size-8 mx-2 pt-2 mr-12 right-8' 
//       onClick = {() => CloseFiles()}
//      />
    
//     </div>
//   )
// }

// export default PdfViewer