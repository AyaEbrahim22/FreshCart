

import React, { useContext, useEffect, useState } from 'react'
import style from './FeaturedProducts.module.css'
import axios from 'axios'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishlistContext } from '../../Context/WishlistContext'


export default function FeaturedProducts() {

  let [productsData, setProductsData] = useState([])
  let [wishlistProducts, setWishlistProducts] = useState([])

  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }

  let { data, isLoading } = useQuery('featuredProducts', getProducts)

  let { addToCart } = useContext(CartContext)
  let { addToWhishlist, getWishlistItems } = useContext(WishlistContext)

  async function postToWishlist(id, e) {

    e.classList.add('text-danger')
    let { data } = await addToWhishlist(id)

    if (data?.status == "success") {
      toast.success(data.message, {
        position: 'top-center',
        duration: 2000,
        icon: '👏',
      })
    }
  }

  async function postToCart(id) {
    let { data } = await addToCart(id)
    if (data?.status == "success") {
      toast.success(data.message, {
        position: 'bottom-right',
        duration: 2000,
        icon: '👏',
      })
    }

  }

  function searchByName(name) {
    setProductsData(data.data.data.filter((product) => product.title.toLowerCase().includes(name.toLowerCase())))
  }

  async function getWishtlistProducts() {

    let Products = await getWishlistItems()

    setWishlistProducts(Products?.data?.data)

  }

  useEffect(() => {
    getWishtlistProducts()
  }, [])

  useEffect(() => {
    return
  }, productsData)


  return <>

    <div className='w-75 mx-auto my-5 pt-4'>
      <input id='searchInput' onChange={(e) => searchByName(e.target.value)} type='search' className='form-control my-5' placeholder='Search by product name..' />

    </div>

    {isLoading ? <div>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass="text-main mt-5 d-flex justify-content-center"
        visible={true}
      />
    </div> : <>
      <div className="row gy-4">

        {(productsData.length != 0) ? <>{productsData.map((product, index) => <div key={index} className='col-md-3'>
          <div className='product p-2 position-relative'>
            <Link to={`/productdetails/${product.id}`}>
              <img src={product.imageCover} alt="product Image" className='w-100' />

              <div>
                <span className='font-sm text-main'>{product.category.name}</span>
                <h3 className='h5'>{product.title.split(' ').splice(0, 2).join(' ')}</h3>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className='font-sm'>{product.price} EGP</span>
                <span className='font-sm'>
                  <i className='fas fa-star rating-color me-1'></i>
                  {product.ratingsAverage}</span>
              </div>

            </Link>
            <div className={style.wishIcon}>

                {wishlistProducts?.some(obj => obj.id === product.id) ?  <i  onClick={(e) => postToWishlist(product.id, e.target)} className="fa-solid fa-heart fa-2xl text-danger" role="button"></i> :<i onClick={(e) => postToWishlist(product.id, e.target)} className="fa-solid fa-heart fa-2xl" role="button" ></i> }

                </div>

            <button onClick={() => postToCart(product.id)} className='btn bg-main text-main-light w-100 btn-sm mt-3'>Add to cart</button>
          </div>
        </div>
        )}</> : <>{data?.data.data.map((product, index) => <div key={index} className='col-md-3'>
          <div className='product p-2 position-relative'>
            <Link to={`/productdetails/${product.id}`}>
              <img src={product.imageCover} alt="product Image" className='w-100' />

              <div>
                <span className='font-sm text-main'>{product.category.name}</span>
                <h3 className='h5'>{product.title.split(' ').splice(0, 2).join(' ')}</h3>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className='font-sm'>{product.price} EGP</span>
                <span className='font-sm'>
                  <i className='fas fa-star rating-color me-1'></i>
                  {product.ratingsAverage}</span>
              </div>

            </Link>


               <div className={style.wishIcon}>

                {wishlistProducts?.some(obj => obj.id === product.id) ?  <i  onClick={(e) => postToWishlist(product.id, e.target)} className="fa-solid fa-heart fa-2xl text-danger" role="button"></i> :<i onClick={(e) => postToWishlist(product.id, e.target)} className="fa-solid fa-heart fa-2xl" role="button" ></i> }

              </div>

            <button onClick={() => postToCart(product.id)} className='btn bg-main text-main-light w-100 btn-sm mt-3'>Add to cart</button>
          </div>
        </div>
        )} </>}

      </div>
    </>

    }

  </>

}





/****************************************************************************************************/ 





//   wishlistProducts.filter( (wishProduct) => { data?.data.data.map((product) => product.id  ==  wishProduct.id ? <div className='col-md-3'>
//     <div className='product p-2 position-relative'>
//       <Link to={`/productdetails/${product.id}`}>
//         <img src={product.imageCover} alt="product Image" className='w-100' />

//         <div>
//           <span className='font-sm text-main'>{product.category.name}</span>
//           <h3 className='h5'>{product.title.split(' ').splice(0, 2).join(' ')}</h3>
//         </div>
//         <div className="d-flex justify-content-between align-items-center">
//           <span className='font-sm'>{product.price} EGP</span>
//           <span className='font-sm'>
//             <i className='fas fa-star rating-color me-1'></i>
//             {product.ratingsAverage}</span>
//         </div>

//       </Link>

//       <div className={style.wishIcon}>
//         <i onClick={(e) => postToWishlist(product.id, e.target)} className="fa-solid fa-heart fa-2xl text-danger" role='button'></i>
//       </div>

//       <button onClick={() => postToCart(product.id)} className='btn bg-main text-main-light w-100 btn-sm mt-3'>Add to cart</button>
//     </div>
//   </div>

//   : <div className='col-md-3'>
//   <div className='product p-2 position-relative'>
//     <Link to={`/productdetails/${product.id}`}>
//       <img src={product.imageCover} alt="product Image" className='w-100' />

//       <div>
//         <span className='font-sm text-main'>{product.category.name}</span>
//         <h3 className='h5'>{product.title.split(' ').splice(0, 2).join(' ')}</h3>
//       </div>
//       <div className="d-flex justify-content-between align-items-center">
//         <span className='font-sm'>{product.price} EGP</span>
//         <span className='font-sm'>
//           <i className='fas fa-star rating-color me-1'></i>
//           {product.ratingsAverage}</span>
//       </div>

//     </Link>

//     <div className={style.wishIcon}>
//       <i onClick={(e) => postToWishlist(product.id, e.target)} className="fa-solid fa-heart fa-2xl" role='button'></i>
//     </div>

//     <button onClick={() => postToCart(product.id)} className='btn bg-main text-main-light w-100 btn-sm mt-3'>Add to cart</button>
//   </div>
// </div>
//   ) }

// )
