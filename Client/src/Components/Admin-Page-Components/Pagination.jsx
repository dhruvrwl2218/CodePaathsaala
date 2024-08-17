import React from 'react'

const Pagination = ({totalPages,onPageChange,currentPage,pageListLimit}) => {
    // console.log(totalPages)
    const startPage = Math.max(currentPage - Math.floor(pageListLimit/2),1);
    const endPage = Math.min(currentPage + Math.floor(pageListLimit/2),totalPages);

    const pageNum = Array.from({length : endPage - startPage + 1 },(_,index)=> startPage + index);

  return (
    <div className='flex gap-8 justify-between p-4 m-1  w-1/2'>
      <div>
        <button 
        onClick={() => onPageChange(currentPage - 1)} disabled = {currentPage === 1} className='bg-indigo-500 p-1 rounded-md'>Prev</button>
      </div>
      <div className=' flex gap-4'> 
        {
          pageNum.map((page) => (
            <button
            key={page}
            onClick={()=> onPageChange(page)}
            className = {page === currentPage ? `bg-indigo-500 p-1 px-2 rounded-md` : ``}
            >
              {page}
            </button>
          ))
        }
      </div>
      <div>
        <button
        onClick={() => onPageChange(currentPage + 1)} disabled = {currentPage === totalPages}
        className='bg-indigo-500 p-1 rounded-md'>Next</button>
      </div>
    </div>
  )
}

export default Pagination
