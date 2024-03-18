import React from 'react'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import { Helmet } from 'react-helmet'
// import style from './Products.module.css'


export default function Products() {
  

  return <>
  <Helmet>
    <title>Products</title>
  </Helmet>
   <FeaturedProducts/>
  </>
}
