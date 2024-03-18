import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import { BallTriangle } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'
import style from './Cart.module.css'
import { Link } from 'react-router-dom'



export default function Cart() {

  let {getCartItems, deleteCartItem, updateCartItem, deleteCart} = useContext(CartContext)

  let [cart, setCart] = useState([])
  
  let [loading, setLoading] = useState(true)

  let [smallLoading, setSmallLoading] = useState(false)


    async function getItems(){
        let {data} = await getCartItems()
        console.log((data));
        setCart(data)
        setLoading(false)
    }

    async function deleteItem(id){
      setSmallLoading(true)
      let {data} = await deleteCartItem(id)
      setCart(data)
      setSmallLoading(false)
    }

   async function updateItems(id , count){
    if(count < 1){
      setSmallLoading(true)
      let {data} = await deleteCartItem(id)
      setCart(data)
      setSmallLoading(false)
    }else{
      let {data} = await updateCartItem(id,count)
      console.log(data)
      setCart(data)
    }

    }
  
    async function deleteAllCartItems(){
      setLoading(true)
      let {data} = await deleteCart()
      console.log((data));
      setCart(data)
      setLoading(false)
  }

    useEffect(()=>{
      getItems()
    }, [])

  return <>
      <Helmet>
      <title>Cart</title>
    </Helmet>
   
   <div className={`${style.cartMargin} bg-main-light p-5 pb-4`}>
    <div className='d-flex align-items-center justify-content-between w-100'>
    <h2 className='pb-2'>Shop Cart : </h2>
    <button onClick={()=>deleteAllCartItems()} className='btn brdr'>Clear Your Cart</button>
   
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
    </div>:(cart?.data)?<div>
    <div className='d-flex'>
      <div className='d-flex align-items-center justify-content-between w-100'>
      <p className='fw-bold'>Total Cart Price :  <span className='text-main'>{cart.data.totalCartPrice} EGP</span></p>
      {smallLoading? <div className='ms-5'>
        { <BallTriangle
        height={35}
        width={35}
        radius={5}
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClassName="text-main"
        visible={true}
      />}
        </div>: '' }
      <div>
        <p className=' pt-1 fw-bold'>Total Cart Items : <span className='text-main'>{cart.numOfCartItems}</span></p>
      </div>
    </div>

    </div>
    
    {cart.data.products.map(product => <div key={product._id} className='row  align-items-center border-1 border-bottom m-0 my-1'>
      <div className='col-md-1 p-1 pb-3'>
        <div className='image'>
          <img src={product.product.imageCover} alt='img' className='w-100'/>
        </div>
      </div>
      <div className="col-md-10 d-flex align-items-center">
        <div className="item">
          <h3 className='h5 fw-bold'>{product.product.title.split(' ').splice(0,3).join(' ')}</h3>
          <p className='font-sm text-main fw-bold mb-3'>Price : {product.price} EGP</p>
          <button onClick={() =>deleteItem(product.product.id)} className='btn ps-0'>
            <i className='fas fa-trash-can text-danger pe-2'></i>Remove</button>
        </div>      
      </div>
      <div className="col-md-1">
        <div className='count'> 
          <button onClick={()=>updateItems(product.product.id, product.count+1)} className='me-1 btn px-2 py-1 brdr'>+</button>
          <span className='mx-1'>{product.count}</span>
          <button onClick={()=>updateItems(product.product.id, product.count-1)} className='ms -1 btn px-2 py-1 brdr'>-</button>
        </div>
      </div>
    </div>)}
    
   <div className='w-100 d-flex justify-content-center'>
   <Link to={`/shippingaddress/${cart.data._id}`} className='btn bg-main text-light mt-3'>Online Payment</Link>
   </div>

    </div>: <h2 className='text-center p-2 text-main'>Cart is Empty..</h2> }
   </div>
  </>
}
