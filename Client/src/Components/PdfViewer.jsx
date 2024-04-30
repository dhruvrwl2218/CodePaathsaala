import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { IoIosCloseCircle } from "react-icons/io";


const PdfViewer = ({PdfUrl, CloseFiles})=> {
  console.log(PdfUrl)
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }){
    setNumPages(numPages);
  }

  return (
    <div>
      <div>
      <IoIosCloseCircle  className='size-8 mx-2 pt-2 mr-12 right-8' 
      onClick = {() => CloseFiles()}
       />
     </div>
      <Document file = {PdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}
export default PdfViewer


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