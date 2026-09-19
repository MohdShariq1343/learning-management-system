import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = () => {
  return (
    <div className='w-full h-100 d-flex justify-content-center align-items-center py-4'>
       <Spinner animation='border' role='status'>
         <span className='visually-hidden text-info'>Loading...</span>
       </Spinner>
    </div>
  )
}

export default Loading
