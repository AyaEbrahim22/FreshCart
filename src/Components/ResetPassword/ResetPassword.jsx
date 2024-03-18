import React, { useContext, useState } from 'react'
import style from './ResetPassword.module.css'
import axios from 'axios'
import { useFormik } from 'formik'
import { Helmet } from 'react-helmet'
import { userContext } from '../../Context/UserContext'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {
 
  let {setUserToken} = useContext(userContext)

  let navigate = useNavigate()

  async function updatePassword(values){
    let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)

    console.log(data)

    if(data.token){
      localStorage.setItem('userToken', data.token)
      setUserToken(data.token)
      navigate('/')
    }
  }

  let formik = useFormik({
    initialValues: {
      email: '',
      newPassword: ''
    },onSubmit: updatePassword
  })
 
 return <>

 <Helmet>
  <title>Reset Password</title>
 </Helmet>
    <h2 className='mt-5 pt-5 mb-3 text-center fw-bold'>Reset Your Password</h2>

    <form onSubmit={formik.handleSubmit} className='w-75 mx-auto'>
        <input onChange={formik.handleChange} type='email' name='email' placeholder='email' className='form-control mb-3'/>
        <input onChange={formik.handleChange} type='password' name='newPassword' placeholder='new Password' className='form-control'/>
        <button type='submit' className='btn brdr mt-4'>Reset Password</button>
    </form>
  </>
}
