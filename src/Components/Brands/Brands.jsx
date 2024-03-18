import axios from 'axios'
import React, { useState } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import style from './Brands.module.css'
import { Helmet } from 'react-helmet'


export default function Brands() {

  let [detailedBrand, setDetailedBrand] = useState([])

  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }

  let { data, isLoading } = useQuery('brands', getBrands)
  // console.log(data?.data.data)

  async function getDetailedBrand(id) {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    setDetailedBrand(data.data)
    // console.log(detailedBrand)
  }

  // let brand = useQuery('detailedBrand', getDetailedBrand)



  return <>

    <Helmet>
      <title>Brands</title>
    </Helmet>

    <h2 className='text-center text-main fw-bold my-5 pt-5'>All Brands</h2>

    {isLoading ? <div className='loading'>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass="text-main mt-5 d-flex justify-content-center"
        visible={true}
      /></div> : <div className='row gy-4'>

      {data?.data.data.map((brand, index) => <div key={index} onClick={() => getDetailedBrand(brand._id)} className='col-md-3' data-bs-toggle="modal" data-bs-target="#exampleModal" role='button'>
        <div className={`${style.brands} p-2 border rounded-2`}>
          <img src={brand.image} className='w-100' alt={brand.name} />
          <p className='text-center'>{brand.name}</p>
        </div>
      </div>)}

      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='d-flex align-items-center justify-content-between'>
                <div className='p-2'>
                  <h3 className='text-main fw-bold'>{detailedBrand.name}</h3>
                  <h5>{detailedBrand.slug}</h5>
                </div>
                <img src={detailedBrand.image} className='w-50' alt='logo' />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

    </div>}
  </>
}
