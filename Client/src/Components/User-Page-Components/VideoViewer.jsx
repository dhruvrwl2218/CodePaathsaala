import React from 'react'
import ReactPlayer from 'react-player'
import { IoIosCloseCircle } from "react-icons/io";


const VideoViewer = ({VideoUrl,CloseFiles}) => {

  console.log("inside video" + VideoUrl);
  // console.log(props)

 try {
  return (
    <div className ="top-30 left-40 w-2/3  m-5  ">
      <IoIosCloseCircle  className='size-8 mx-2 pt-2 mr-12 right-8' 
      onClick={() => CloseFiles()}/>
      <ReactPlayer 
    url={`${VideoUrl}`}
    width = "100%"
    height= "100%"
    controls = {true} 
    />
    
    </div>
  )
 } catch (error) {
  console.log(error)
  return(
    
    <div><p>error while playing</p></div>
  )
 }
}

export default VideoViewer
