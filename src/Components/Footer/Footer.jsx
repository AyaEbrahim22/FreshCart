import React from 'react'
// import style from './Footer.module.css'

import amazon from '../../Assets/images/Amazon_Pay_logo.png'
import express from '../../Assets/images/AmericanExpress.png'
import master from '../../Assets/images/MasterCard.png'
import paypal from '../../Assets/images/PayPal.png'
import appStore from '../../Assets/images/AppStoreLogo.png'
import googlePlay from '../../Assets/images/GooglePlayLogo.png'


export default function Footer() {
  return <>
    <div className='bg-secondary-subtle w-100 mt-4 py-5 px-5'>

      <div className='title'>
        <h4>Get the FreshCart app</h4>
        <p className='text-secondary'>We will send you a link, open it on your phone to download the app</p>
      </div>

      <form className='row mx-4 border-1 border-bottom pb-4 border-dark-subtle'>

        <div className="col-md-10">
          <input type="email" class="form-control" placeholder='Email..' />
        </div>
        
        <div className="col-md-2">
          <button type="submit" class="btn bg-main text-light px-4">Share App Link</button>
        </div>

      </form>

      <div className='mx-4 d-flex align-items-center justify-content-between border-1 border-bottom border-dark-subtle'>

      <div className='py-3 px-1 d-flex align-items-center'>
        <span className='fw-bold'>Payment Partners</span>
        <img src={amazon} alt='Amazon Pay logo' className='ms-2 mt-2' width={60}></img>
        <img src={express} alt='American Express logo' className='mt-1' width={60}></img>
        <img src={master} alt='Master Card logo' className='mt-1' width={60}></img>
        <img src={paypal} alt='Pay Pal logo' className='mt-1 ms-1' width={60}></img>
      </div>

      <div>
      <span className='fw-bold'>Get deliveries with FreshCart</span>
      <img src={appStore} alt='App store logo' className='ms-2' width={80}></img>
      <img src={googlePlay} alt='App store logo' className='ms-1' width={80}></img>
      
      </div>

      </div>



    </div>
  </>
}
