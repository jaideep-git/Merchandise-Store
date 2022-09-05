import React from "react";
import { Link } from "react-router-dom";
import "./ProductStyles.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import StarRatings from "react-star-ratings";

function ProductCard({ product }) {
  const mobile = window.innerWidth <= 768;
  const options = {
    rating: product.rating,
    isSelectable: false,
    starEmptyColor: "rgba(20,20,20,0.1)",
    starRatedColor: "#FEEE01",
    starDimension: "15px",
    starSpacing: "1px",
  };

  return (
    <Link to={`/product/${product._id}`} className="productCard">
      <Card
        sx={{ maxWidth: 350 }}
        className="product_card"
        style={{ height: "auto", color: "none", boxShadow: "none", borderRadius:"0" }}
      >
        <CardMedia
          component="img"
          height={mobile ? '180' : '250'}
          image={product.imageUrl}
          alt="green iguana"
          style={{ borderRadius:"none" }}
        />
        <CardContent>
          <p className="productCard_name">{product.name} </p>

          {product.totalReviews !== 0 ? (
            <>
              <div className="product_rating">
                <span style={{ marginRight:"5px" }}><StarRatings {...options} /></span>
                <span className="productCard_review">{product.totalReviews} { product.totalReviews === 1 ? "review" : "reviews" }</span>
              </div>
            </>
          ) : (
            ""
          )}

          <p className="productCard_price">${product.price}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ProductCard;
