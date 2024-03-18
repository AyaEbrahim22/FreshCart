import React, { useState } from 'react'
// import style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { BallTriangle } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'


export default function Register() {
 
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)

  let navigate = useNavigate()

  async function registerSubmit(values){
    setLoading(true)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
    .catch((err)=> {setApiError(err.response.data.message);
      setLoading(false)
    })
   
    if(data.message === 'success'){
      setLoading(false)
      navigate('/login')
    }

  }
  let validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(3, 'min length is 3').max(10, 'max length is 10'),
    email: Yup.string().required('Email is required').email('Invalid Email'),
    password: Yup.string().required('Password is required').matches(/^[A-Z][\w @]{5,8}$/, 'Invalid password ex(Ahmed123)'),
    rePassword: Yup.string().required('rePassword is required').oneOf([Yup.ref('password')], "password and re-password don't match"),
    phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'We need an egyptian number'),
  })

  let formik = useFormik({
    initialValues:{
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
    },validationSchema
    ,onSubmit:registerSubmit
  })
 
 return <>
    <Helmet>
      <title>Register</title>
    </Helmet>
    <div className='w-75 m-auto py-5 mt-5'>
      <h2>Register Now:</h2>
      
      <form onSubmit={formik.handleSubmit}>
        {apiError ? <div className='alert alert-danger'>{apiError}</div> : ''}
 
        <label htmlFor='name'>Name : </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='text' id='name' name='name' className='form-control mb-3' />
       {formik.errors.name && formik.touched.name ? <div className='alert alert-danger py-2'>{formik.errors.name}</div>:'' }
        
        <label htmlFor='email'>Email : </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='email' id='email' name='email' className='form-control mb-3' />
        {formik.errors.email && formik.touched.email?<div className='alert alert-danger py-2'>{formik.errors.email}</div>: '' }

        <label htmlFor='password'>Password : </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='password' id='password' name='password' className='form-control mb-3' />
        {formik.errors.password && formik.touched.password?<div className='alert alert-danger py-2'>{formik.errors.password}</div>: '' }

        <label htmlFor='repassword'>Repassword : </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='password' id='repassword' name='rePassword' className='form-control mb-3' />
        {formik.errors.rePassword && formik.touched.rePassword?<div className='alert alert-danger py-2'>{formik.errors.rePassword}</div>: '' }

        <label htmlFor='phone'>Phone : </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='tel' id='pnone' name='phone' className='form-control mb-3' />
       {formik.errors.phone && formik.touched.phone?<div className='alert alert-danger py-2'>{formik.errors.phone}</div>: '' }

        {loading ? <button type='button' className='btn bg-main text-light'>
        <BallTriangle
        height={20}
        width={20}
        radius={5} 
        color="#fff"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
         </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Register</button>}
        
         <Link className='ps-3' to={'/login'}>Login Now</Link>
      </form>

    </div>
  </>
}
