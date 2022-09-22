import React from 'react';
import StarRatings from 'react-star-ratings';

const Review = ({ review }) => {

  const options = {
    rating:review.rating,
    isSelectable: false,
    starEmptyColor: "rgba(20,20,20,0.1)",
    starRatedColor: "#FEEF00",
    starDimension:"20px",
    starSpacing:"1px",
  };

  return (
    <div className='review'>
      <div className='profile_circle'>
        {review.name.charAt(0)}
      </div>
      <div style={{display:"flex",flexDirection:"column", gap:"7px"}}>
        <StarRatings {...options} /> 
        <p><b>{review.name}</b></p>
        <p>{ review.comment }</p>
      </div>
    </div>
  )
}

export default Review