import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import style from './Categories.module.css'
import SubCategory from '../SubCategory/SubCategory'
import { Helmet } from 'react-helmet'
import { BallTriangle } from 'react-loader-spinner'


export default function Categories() {

  let [subCategories, setSubCategories] = useState([])
  let [specificCategory, setspecificCategory] = useState([])
  let [loading, setLoading] = useState(false)

  function getCategories(){
      return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

 let {data} =  useQuery('categories', getCategories)


 async function getSubCategories(categoryId){
  setLoading(true)
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`)

    setSubCategories(data?.data)
    getSpecificCategory(categoryId)
    setLoading(false)
 }

 async function getSpecificCategory(categoryId){
  let specificCategoryForName = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`)
  setspecificCategory(specificCategoryForName.data.data.name)
}

  return <>
     <Helmet>
      <title>Categories</title>
    </Helmet>
    
  <h2 className='text-center text-main fw-bold mt-5 mb-3 pt-5'>All Categories</h2>
    <div className='row g-4 my-4'>
    {data?.data.data.map((category) =><div key={category._id} onClick={ () => getSubCategories(category._id)} className='col-md-4' role='button'>
        <div className={`${style.categories}`}>
          <img src={category.image} height={330} width={300} className='w-100 object-fit-cover' alt={category.name}/>
          <p className='text-center h4 fw-bold text-main p-3'>{category.name}</p>
        </div>
      </div>
   )}

   {loading? <div className='loading'>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClassName="text-main mt-5 d-flex justify-content-center"
        visible={true}
      /></div>:  <SubCategory SubCategories={subCategories} specificCategory={specificCategory}/>}

   </div>

  </>
}
