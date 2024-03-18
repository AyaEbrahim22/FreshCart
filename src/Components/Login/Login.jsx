import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { BallTriangle } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import style from './Login.module.css'
import { userContext } from '../../Context/UserContext'
import { Helmet } from 'react-helmet'


export default function Login() {

  
let {setUserToken} = useContext(userContext)
  
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)

  let navigate = useNavigate()

  async function loginSubmit(values){
    setLoading(true)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin `, values)
    .catch((err)=> {setApiError(err.response.data.message);
      setLoading(false)
    })
   
    if(data.message === 'success'){
      setLoading(false)
      localStorage.setItem('userToken', data.token)
      setUserToken(data.token)
      navigate('/')
    }

  }
  let validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Invalid Email'),
    password: Yup.string().required('Password is required').matches(/^[A-Z][\w @]{5,8}$/, 'Invalid password ex(Ahmed123)'),
  })

  let formik = useFormik({
    initialValues:{
    email:"",
    password:""

    },validationSchema
    ,onSubmit:loginSubmit
  })
  
  
  return <>
     <Helmet>
      <title>Login</title>
    </Helmet>

  <div className='w-75 m-auto py-5 mt-5'>
    <h2>Login Now:</h2>
    
    <form onSubmit={formik.handleSubmit}>
      {apiError ? <div className='alert alert-danger'>{apiError}</div> : ''}

      <label htmlFor='email'>Email : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='email' id='email' name='email' className='form-control mb-3' />
      {formik.errors.email && formik.touched.email?<div className='alert alert-danger py-2'>{formik.errors.email}</div>: '' }

      <label htmlFor='password'>Password : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='password' id='password' name='password' className='form-control mb-3' />
      {formik.errors.password && formik.touched.password?<div className='alert alert-danger py-2'>{formik.errors.password}</div>: '' }

      
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
       </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Login</button>}
      
      <Link className='ps-3' to={'/register'}>Register Now</Link>
      <Link className={`${style.password} ps-3 float-end`} to={'/forgetpassword'}>Forget Your Password?</Link>
       
    </form>

  </div>
</>

}
