import React from 'react'
import style from './ForgetPassword.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function ForgetPassword() {
  
  let navigate = useNavigate()

   async function postEmail(values){

    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords `, values)
  
    console.log(data)
    if(data.statusMsg === 'success'){
      navigate('/verifycode')
    }
}

  let formik = useFormik({
    initialValues:{
       email: '',
    }, onSubmit: postEmail
  })
  
  
  return <>

  <Helmet>
    <title>Forget Passsword</title>
  </Helmet>

    <form onSubmit={formik.handleSubmit} className='mt-5 pt-5 w-75 mx-auto'>
    <h2 className='fw-bold mb-4 text-center'>Please enter your email</h2>

        <input onChange={formik.handleChange} type='email' name='email' placeholder='Email' className='form-control'/>

        <button type='submit' className='btn brdr mt-4'>Verify</button>
    </form>
  </>
}
