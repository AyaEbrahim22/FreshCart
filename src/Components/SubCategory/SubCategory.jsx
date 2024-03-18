import React, { useState } from 'react'
import style from './SubCategory.module.css'

export default function SubCategory({SubCategories,specificCategory}) {
  
  return <>

   <h2 className='text-main text-center fw-bold'>{specificCategory.length > 0 ?( specificCategory + ' subcategories'): ''}</h2>

      {SubCategories? <div className='row g-4'>
      {SubCategories.map( (category,index) => <div key={index} className='col-md-4'>
        <div className={style.subcategories}>
          <span className='fw-bold'>{category.name}</span>
        </div>
      </div>) }
      </div> : ''}

  </>
}
