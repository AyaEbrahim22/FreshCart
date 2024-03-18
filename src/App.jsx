import React, { useContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Products from './Components/Products/Products'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import NotFound from './Components/NotFound/NotFound'
import CounterContextProvider from './Context/CounterContext'
import { userContext } from './Context/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { Toaster } from 'react-hot-toast';
import WishList from './Components/WishList/WishList'
import ShippingAddress from './Components/ShippingAddress/ShippingAddress'
import AllOrders from './Components/AllOrders/AllOrders'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import VerifyCode from './Components/VerifyCode/VerifyCode'
import ResetPassword from './Components/ResetPassword/ResetPassword'


export default function App() {

  let routers =createHashRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute>  },
        { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute>  },
        { path: 'shippingaddress/:cartId', element: <ProtectedRoute><ShippingAddress /></ProtectedRoute>  },
        { path: 'brands', element: <ProtectedRoute><Brands /> </ProtectedRoute>},
        { path: 'wishlist', element: <ProtectedRoute><WishList /> </ProtectedRoute>},
        { path: 'register', element: <Register /> },
        { path: 'forgetpassword', element: <ForgetPassword /> },
        { path: 'verifycode', element: <VerifyCode /> },
        { path: 'resetpassword', element: <ResetPassword /> },
        { path: 'login', element: <Login /> },
        { path: '*', element: <NotFound /> },
      ]
    }
  ])

  let {setUserToken} = useContext(userContext)
  
  useEffect(() => {
    if(localStorage.getItem('userToken')){
      setUserToken(localStorage.getItem('userToken'))
    }
  }, [])
  


  return <>

      <CounterContextProvider>

        <RouterProvider router={routers}></RouterProvider>
        <Toaster/>
      </CounterContextProvider>

  </>

}

