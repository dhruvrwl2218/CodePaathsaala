import React from 'react'
import { Link } from 'react-router-dom';

const PageNF = () => {
  return (
    <div className='flex flex-wrap justify-center  text-indigo-600  p-8'>
      <p className='w-full text-center m-5 mt-12 text-5xl font-bold '>PAGE NOT FOUND</p>
      <div className='w-full flex justify-center p-2'>
        <img src="/404.png" alt="" className=''/>
      </div>
      <Link to = "/"><p className='bg-neutral-800 p-2 rounded-xl mt-5 text-2xl'>Back to Home</p></Link>
    </div>
  )
}

export default PageNF;
