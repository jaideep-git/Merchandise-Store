import React from 'react';
import './Home.css';
import office from '../../assets/office.jpg';
import Slider from "react-slick";

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  return (
    <div className='hero'>
      <Slider {...settings}>
          <div className='hero_image'>
            <img src={office} alt="" srcset="" />
          </div>
        </Slider>
    </div>
  )
}

export default Carousel