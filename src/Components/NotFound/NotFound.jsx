import React from 'react'
// import style from './NotFound.module.css'
import img from '../../Assets/images/NotFoundPage.png'
import { Helmet } from 'react-helmet'

export default function NotFound() {
  return <>

  <Helmet>
    <title>Not Found Page</title>
  </Helmet>

  <div className='w-75 m-auto mt-5 pt-5'>
     <img src={img} alt="Not Found Img" className='w-100' />
     <h3 className='text-center text-secondary'>Not Found Page</h3>
  </div>
    
  </>
}
