import React from 'react'
import style from './MainSlider.module.css'
import slider1 from '../../Assets/images/slider-image-1.jpeg'
import slider2 from '../../Assets/images/slider-image-2.jpeg'
import slider3 from '../../Assets/images/slider-image-3.jpeg'
import img1 from '../../Assets/images/grocery-banner.png'
import img2 from '../../Assets/images/grocery-banner-2.jpeg'
import Slider from 'react-slick'



export default function MainSlider() {
  
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };
  
  return <>
      <div className="row my-3 gx-0 mt-5">
        <div className="col-md-9 mt-4">
          <Slider {...settings}>
            <img src={slider3} height={400} alt="slider1" className='w-100'/>
            <img src={slider2} height={400} alt="slider2" className='w-100'/>
            <img src={slider1} height={400} alt="slider3" className='w-100'/>
          </Slider>
        </div>
        <div className='col-md-3 mt-4'>
            <img src={img1} height={200} alt="image1" className='w-100'/>
            <img src={img2} height={200} alt="image2" className='w-100'/>
        </div>
      </div>
  </>
}
