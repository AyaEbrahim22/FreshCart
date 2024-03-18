import React, { useContext, useEffect } from 'react'
import style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/images/freshcart-logo.svg'
import { userContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
import { useQuery } from 'react-query'

export default function Navbar() {

  let { userToken, setUserToken } = useContext(userContext)
  let {getCartItems} = useContext(CartContext)

  
  async function getItems(){
    return await getCartItems()
 }

   let {data} = useQuery('cartItems', getItems,{
    refetchInterval: 1000

  })

  let navigate = useNavigate()

  function logOut() {
    localStorage.removeItem('userToken');
    setUserToken(null)
    navigate('/login')
  }

  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed top-0 w-100 z-3">
      <div className="container">

        <Link className="navbar-brand" to={'/'}>
          <img src={logo} alt='logo' />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

            {userToken != null ? <>

              <li className="nav-item px-1">
                <Link className={`nav-link`} to={'/'}>Home</Link>
              </li>

              <li className="nav-item px-1">
                <Link className={`nav-link`} to={'cart'}>Cart</Link>
              </li>

              <li className="nav-item px-1">
                <Link className={`nav-link`} to={'wishlist'}>Wishlist</Link>
              </li>

              <li className="nav-item px-1">
                <Link className={`nav-link`} to={'products'}>Products</Link>
              </li>

              <li className="nav-item px-1">
                <Link className={`nav-link`} to={'categories'}>Categories</Link>
              </li>

              <li className="nav-item px-1">
                <Link className={`nav-link`} to={'brands'}>Brands</Link>
              </li></> : ''}

          </ul>

          <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center">
           
            {(userToken != null) ? <> 
              <li className="nav-item position-relative">
              <Link className="nav-link" to={'cart'}><i class={`${style.iconFont} fa-solid fa-cart-shopping fa-xl me-2`}></i></Link>
              {(data?.data != undefined)? <span className={`${style.cartCountNumber} bg-main text-light rounded`}>{data?.data.numOfCartItems}</span> :  <span className={`${style.cartCountNumber} bg-main text-light rounded`}>0</span> }
            </li>         

            <li className="nav-item">
              <span onClick={() => logOut()} className="nav-link cursor-pointer fs-5">LogOut</span>
            </li>
            </> : <> <li className="nav-item">
              <Link className="nav-link" to={'register'}>Register</Link>
            </li>
              <li className="nav-item">
                <Link className="nav-link" to={'login'}>Login</Link>
              </li></>

            }

          </ul>

        </div>
      </div>
    </nav>
  </>
}
