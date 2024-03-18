import React from 'react'
import style from './CategoriesSlider.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import Slider from 'react-slick'

export default function CategoriesSlider() {
  
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false
  };

  function getCategories(){

    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

 let {data} =  useQuery('categories', getCategories)

  
  return <>
    <div className="row">
      <Slider {...settings}>
      {data?.data.data.map((category) => <div key={category._id} className='col-md-3'>
        <img src={category.image} height={200} className='w-100' alt={category.name}/>
        <p className='ms-2'>{category.name}</p>
      </div>)}
      </Slider>
    </div>
  </>
}
