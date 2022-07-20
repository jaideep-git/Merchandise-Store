import React from 'react';
import { Link } from "react-router-dom";
import "./ProductStyles.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import office from '../../assets/theoffice_600x.png';
import StarRatings from 'react-star-ratings';


function ProductCard({ product }) {
  const options = {
    rating:product.rating,
    isSelectable: false,
    starEmptyColor: "rgba(20,20,20,0.1)",
    starRatedColor: "tomato",
    starDimension:"15px",
    starSpacing:"1px",
  };

  return (
    <Link  to={ `/product/${product._id}` }>
      <Card sx={{ maxWidth: 350 }} className='product_card' style={{height:"auto"}}>
        <CardMedia
          component="img"
          height="240"
          image={office}
          alt="green iguana"
        />
        <CardContent>
          <h3>{product.name} </h3>
          <div className='product_rating'>
            <StarRatings {...options}/> <span>{product.totalReviews}  Reviews</span>
          </div>
          <h3>${ product.price }</h3>
        </CardContent>
    </Card>
    </Link>
  )
}

export default ProductCard