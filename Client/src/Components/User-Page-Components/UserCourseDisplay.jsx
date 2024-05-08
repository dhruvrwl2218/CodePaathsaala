import React, { useState } from 'react'
import { RiFolderVideoLine } from "react-icons/ri";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import VideoViewer from './VideoViewer';
import PdfViewer from './PdfViewer';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

import { FaFilePdf } from "react-icons/fa6";


const UserCourseDisplay = ({props}) => {
  
  

  const[coursecontent,setCourseContent] = useState(false);
  const [filesPage,setFilesPage] = useState(false);
  const[fileDetail,setFileDetail] = useState();

    // console.log("same-diff")
    // console.log(props)
  const fileExtension = (url) =>{
    console.log(url)
    const URL = url.toLowerCase();
    const parts = URL.split('.');
   return (parts[parts.length-1]);
  }
    const Openfiles = (url) => {
      
    const extension = fileExtension(url);

      if(extension === 'mp4'){
        setFileDetail(['mp4',url]);
        setFilesPage(true)
      }else{
        setFileDetail(['pdf',url]);
        setFilesPage(true) 
      }
    }

    const CloseFiles = () => {
      console.log('clicked')
      setFileDetail();
      setFilesPage(false);
    }

  return (
    <div className="w-full text-white flex  bg-neutral-800 m-2 p-2  max-md:flex-col max-sm:w-full my-12">
    <div> 
      {
        filesPage !== false && <div className='bg-neutral-800 fixed inset-0 flex items-center justify-center z-50 max-sm:mx-10 bg-opacity-30 backdrop-blur-sm '>
        { fileDetail[0] === 'pdf' ? <PdfViewer PdfUrl = {fileDetail[1]} CloseFiles = {CloseFiles}/> :
        <VideoViewer VideoUrl = {fileDetail[1]} CloseFiles = {CloseFiles}/>}
        </div>
      }  
    </div> 
    <div className="w-full">
      <p className="text-4xl font-semi-bold p-3 text-center max-sm:order-2 ">
        {props?.Name}
      </p>
      <div className="flex gap-4 p-2 m-2 max-sm:flex-col max-sm:gap-2">
        <p>
          {" "}
          <span className="p-1 font-semibold text-lg">Status:</span> Online
        </p>
        <p>
          {" "}
          <span className="p-1 font-semibold text-lg">Language:</span>
          English
        </p>
        <p><span className="p-1 font-semibold text-lg">Duration :</span>{props.Duration}</p>
      </div>
      <div className="shadow-sm shadow-indigo-400 p-5 m-5 text-center">
        <button
          className=" font-semibold text-lg bg-indigo-600 w-full rounded-md p-4"
          onClick={() => {
            coursecontent === false
              ? setCourseContent(true)
              : setCourseContent(false);
          }}
        >
          Course Content
        </button>
        <ul className={coursecontent === true ? ` ` : `hidden`}>
          {props?.StudyMaterial.map((Content) => (
            <li
              className="bg-neutral-800  list-none 
              text-center rounded-md font-semibold text-lg
              shadow-sm shadow-indigo-400 m-4 h-10 p-1"
              key={Content.FileUrl}
              onClick={()=> Openfiles(Content.FileUrl)}
            >
              <div className='flex  justify-between '>
              <div>{fileExtension(Content.FileUrl) === 'mp4'?
              <RiFolderVideoLine className='size-8 mx-2 pt-2 mr-12 '/>:
              <FaFilePdf className='size-8 mx-2 pt-2 mr-12 '/>}
              </div>
              
              <p className=' pt-1 '>{Content.FileName}</p>
              <IoIosArrowDropdownCircle className='size-6 mx-2 pt-2  '/>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="items-center text-center p-1 m-1 w-1/3 shadow-sm shadow-indigo-400 max-sm:w-full max-sm:order-1">
      <img
        src={props?.Thumbnail}
        alt="courseThumbail"
        className="p-2 m-2"
      />
      <p className="p-2 my-2 max-sm:hidden">
        <span className="p-1 font-semibold text-lg w-full">Discription:</span>
        {props?.Description}
      </p>
    </div>
  </div>
  )
}

export default UserCourseDisplay


 

       {/*{filesPage[0] != false && <div className = " bg-indigo-200 fixed inset-0 flex items-center justify-center z-50 max-sm:mx-10">   //opacity-70 
        {adddlt[0] === "addFiles" ? <AddFiles api = {adddlt[1]} removePopUp = {removePopUp} />:<CourseUserDeletion removePopUp = {removePopUp} api = {adddlt[1]}/>}
        </div>}
        {fileDetail[0] === "mp4" ? <VideoViewer VideoUrl = {fileDetail[1]}/> : <PdfViewer pdfUrl = {fileDetail[1]}/>} */
      }