import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Offline} from "react-detect-offline";

export default function Layout() {
  return <>
    <Navbar />

    <div className="container">

      <Offline><div className="loading fs-3 fw-bold">You Are Offline!!</div></Offline>
      <Outlet></Outlet>
    </div>


    <Footer />
  </>
}
