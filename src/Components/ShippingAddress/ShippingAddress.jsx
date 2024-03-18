import React, { useContext } from 'react'
import style from './ShippingAddress.module.css'
import { useFormik } from 'formik'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'

export default function ShippingAddress() {
 
  let {checkOutSession} = useContext(CartContext)
  let {cartId} = useParams()

  async function checkOut(values){
   let {data} = await checkOutSession(cartId, values)
   console.log(data);

   if(data.status == 'success'){
    window.location.href = data.session.url
    
   }
  }

  let formik = useFormik({
    initialValues:{
      details: "",
      phone: "",
      city: ""
    },onSubmit: checkOut
  })
 
 
 return <>

 <Helmet>
  <title>
   Online Payment
  </title>
 </Helmet>

    <h2 className='mt-5 pt-4 mb-3'>Shipping Address</h2>

    <div className='w-75 mx-auto'>
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor='details'>Details</label>
        <input onChange={formik.handleChange} type='text' id="details" name='details' className='form-control mb-3'/>

        
        <label htmlFor='phone'>Phone</label>
        <input onChange={formik.handleChange} type='tel' id="phone" name='phone' className='form-control mb-3'/>

        
        <label htmlFor='city'>City</label>
        <input onChange={formik.handleChange} type='text' id="city" name='city' className='form-control mb-3'/>

        <button className='btn bg-main text-light' type='submit'>CheckOut</button>
      </form>
    </div>


  </>
}
