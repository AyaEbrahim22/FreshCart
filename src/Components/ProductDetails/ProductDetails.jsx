import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BallTriangle } from 'react-loader-spinner'
import Slider from "react-slick";
import { Helmet } from 'react-helmet'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishlistContext } from '../../Context/WishlistContext'


export default function ProductDetails() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  let [details, setDetails] = useState([])

  let [loading, setLoading] = useState(true)

  let [wishlistProducts, setWishlistProducts] = useState([])


 let {addToCart} =  useContext(CartContext)

 let { addToWhishlist, getWishlistItems } = useContext(WishlistContext)

 async function postToWishlist(id, e) {

  e.classList.add('text-danger')
  let { data } = await addToWhishlist(id)

  if (data.status == "success") {
    toast.success(data.message, {
      position: 'top-center',
      duration: 2000,
      icon: '👏',
    })
  }
}

async function getWishtlistProducts() {

  let Products = await getWishlistItems()
  console.log(Products.data.data);
  setWishlistProducts(Products.data.data)

}

 async function postToCart(id){
  let {data} =  await addToCart(id)
   if(data.status == "success"){
     toast.success(data.message, {
       position: 'bottom-right',
       duration: 2000,
       icon: '👏',
     })
   }
 
 }
  let { id } = useParams()

  async function getProductDetails(id) {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    console.log(data.data)
    setDetails(data.data)
    setLoading(false)
  }

  useEffect(() => {
    getProductDetails(id)
    getWishtlistProducts()
  }, [])


  return <>

    <Helmet>
      <title>{details.title}</title>
    </Helmet>

    {loading ? <div>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass="text-main mt-5 d-flex justify-content-center"
        visible={true}
      />
    </div> : <div className="row align-items-center justify-content-center pb-5 pt-5 mt-4">

      <div className='col-md-4'>
        <Slider {...settings}>
          {details.images.map((image, index) => <img src={image} key={index} className='w-100' alt='detailed img' />)}
        </Slider>
      </div>

      <div className='col-md-8 position-relative'>
        <h3>{details.title}</h3>
        <p>{details.description}</p>
        <span className='text-main'>{details.category.name}</span>
        <div className='d-flex align-items-center justify-content-between p-2'>
          <span className='font-sm'>{details.price} EGP</span>
          <span className='font-sm pe-4'>
            <i className='fas fa-star rating-color me-1'></i>
            {details.ratingsAverage}</span>

            <div className={style.wishIcon}>

              {wishlistProducts.some(obj => obj.id === details.id) ?  <i  onClick={(e) => postToWishlist(details.id, e.target)} className="fa-solid fa-heart fa-2xl text-danger" role="button"></i> :<i onClick={(e) => postToWishlist(details.id, e.target)} className="fa-solid fa-heart fa-2xl" role="button" ></i> }

              </div>

        </div>

        <button onClick={() => postToCart(details.id)} className='btn bg-main btn-sm w-100 text-white mt-2'>+ Add to cart</button>
      </div>


    </div>

    }



  </>
}
