import React from 'react';
import { Link } from "react-router-dom";
import "./Product.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import office from '../../assets/theoffice_600x.png';
import ReactStars from "react-rating-stars-component";


function ProductCard({ product }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value:product.rating,
    isHalf: true,
  };

  return (
    <Link  to={ product._id }>
      <Card sx={{ maxWidth: 300 }} className='product_card' style={{height:"400px"}}>
        <CardMedia
          component="img"
          height="240"
          image={office}
          alt="green iguana"
        />
        <CardContent>
          <h3>{product.name} </h3>
          <div className='product_rating'>
            <ReactStars {...options}/> <span>{product.totalReviews}  Reviews</span>
          </div>
          <h3>${ product.price }</h3>
        </CardContent>
    </Card>
    </Link>
  )
}

export default ProductCard