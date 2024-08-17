import React from 'react'

const Loading = ({styling}) => {
  return (
    <div className = {`${styling}`}>
      <div className='flex justify-center align-middle'>
      <img src="/loading.gif" alt="loading..." className='top-1/2 rounded-full'/>
      </div>
    </div>
  )
}

export default Loading
