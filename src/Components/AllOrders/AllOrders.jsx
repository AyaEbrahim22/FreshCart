import React, { useEffect } from 'react'
import style from './AllOrders.module.css'
import axios from 'axios'

export default function AllOrders() {
  
  async function getdata(){
    let data = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`)
    console.log(data)
  }

 
  useEffect(() => {
    getdata()
  }, [])
  
  return <>
    <h2 className=' mt-5 pt-5 text-center text-main'>All Orders Here</h2>
  </>
}
