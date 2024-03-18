import React, { useContext, useEffect, useState } from 'react'
import style from './WishList.module.css'
import { Helmet } from 'react-helmet'
import { BallTriangle } from 'react-loader-spinner'
import { WishlistContext } from '../../Context/WishlistContext'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function WishList() {
  
  let [loading, setLoading] = useState(true)
  let [smallLoading, setSmallLoading] = useState(false)

  let {getWishlistItems, deleteWishlistItem} = useContext(WishlistContext)
  let {addToCart} = useContext(CartContext)
  let [wishlist, setWishlist] = useState([])

  async function getItems(){
    let {data} = await getWishlistItems()
    setWishlist(data)
    console.log(data);
    setLoading(false)
    setSmallLoading(false)
}

async function deleteItem(id){
  setSmallLoading(true)
  await deleteWishlistItem(id)
  getItems()
  console.log(wishlist)
}

async function postToCart(id) {
  let { data } = await addToCart(id)
  if (data.status == "success") {
    toast.success(data.message, {
      position: 'bottom-right',
      duration: 2000,
      icon: '👏',
    })
  }

}

  
useEffect(()=>{
  getItems()
}, [])

  return <>
     <Helmet>
      <title>Wish List</title>
    </Helmet>

    <div className={`${style.wishMargin} bg-main-light p-5 pb-4`}>

    <div className='d-flex'>
      
    <h2 className='pb-2 me-5'>My wish List : </h2>

{smallLoading? <div className='ms-5'>
    { <BallTriangle
    height={35}
    width={35}
    radius={5}
    ariaLabel="ball-triangle-loading"
    wrapperStyle={{}}
    wrapperClassName="text-main"
    visible={true}
  /> }
    </div>: '' }

    </div>

   {loading? <div className='loading'>
    <BallTriangle
        height={100}
        width={100}
        radius={5}
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClassName="text-main mt-5 d-flex justify-content-center"
        visible={true}
      />
    </div>:<div>

{wishlist?.data.map((product,index) => <div key={index} className='row  align-items-center border-1 border-bottom m-0 my-1'>
  <div className='col-md-2 p-1 pb-3'>
    <div className='image'>
      <img src={product.imageCover} alt='img' className='w-100'/>
    </div>
  </div>
  <div className="col-md-8 d-flex align-items-center">
    <div className="item">
      <h3 className='h5 fw-bold'>{product.title.split(' ').splice(0,3).join(' ')}</h3>
      <p className='font-sm text-main fw-bold mb-1'>{product.price} EGP</p>
      <button onClick={() => deleteItem(product.id)} className='btn ps-0'>
        <i className='fas fa-trash-can text-danger pe-2'></i>Remove</button>
    </div>      
  </div>
  <div className="col-md-2 text-center">
      <button onClick={() => postToCart(product.id)} className='btn brdr p-2'>Add To Cart</button>
  </div>
</div>)}

</div>}
   
   </div>

  </>

}
