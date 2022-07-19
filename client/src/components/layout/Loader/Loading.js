import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import './Loading.css'

function Loading() {
  return (
    <div className='loading'>
      <ClipLoader loading={true} />
    </div>
  )
}

export default Loading