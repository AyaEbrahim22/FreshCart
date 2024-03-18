import React from 'react'
import style from './VerifyCode.module.css'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

export default function VerifyCode() {
  
  let navigate = useNavigate()

  async function postCode(values){

    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
    console.log(data)

    if(data.status == "Success"){
      navigate('/resetpassword')
    }
   
  }
  
  let formik = useFormik({
    initialValues:{
      resetCode: ''  
    }, onSubmit: postCode
  })

  return <>

  <Helmet>
    <title>Verify Code</title>
  </Helmet>

    <h2 className='mt-5 pt-5 mb-4 text-center fw-bold'>Verify your code</h2>

    <form onSubmit={formik.handleSubmit} className='w-75 mx-auto'>

      <input onChange={formik.handleChange} type='text' name='resetCode' placeholder='code' className='form-control'/>

      <button type='submit' className='btn brdr mt-3'>Verify</button>
    
    </form>

  </>
}
