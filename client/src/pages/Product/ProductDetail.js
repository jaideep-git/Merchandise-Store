import { Container, Grid } from '@mui/material'
import React, { useEffect } from 'react';
import office from '../../assets/theoffice_600x.png';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails, clearErrors } from '../../store/actions/productAction';
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import './Product.css'
import Review from '../../components/Product/Review';
import ReviewSubmit from '../../components/Product/ReviewSubmit';
import Loading from '../../components/layout/Loader/Loading';
import { useAlert } from '../../components/Alert/AlertProvider'

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  
  const { fetching, error, product } = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch,id]);

  useEffect(() => {
    if (error) {
      alert({
        message:error
      });
      dispatch(clearErrors());
    }
  }, [error]);
  
  // * Star Rating Options
  const options = {
    rating:product.rating,
    isSelectable: false,
    starEmptyColor: "rgba(20,20,20,0.1)",
    starRatedColor: "#FEEF00",
    starDimension:"17px",
    starSpacing:"1px",
  };

  // * Render Product
  const renderReviews = product.reviews && product.reviews.map((rev) => {
      return <Review key={rev._id} review={rev}/>
  })
 
  return (
    <>
      {fetching ?
        <Loading/>
        : (
            <Container maxWidth="lg" className='product_container'>
              <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6} className="product_image">
                  <img src={office} alt="" />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} className="product_details">
                  <p className='product_name mob-centre'>{product.name}</p>
                  <div className='product_ratings'>
                    <StarRatings {...options} /> <span> ( {product.totalReviews} Reviews )</span>
                  </div>
                  <p className='product_price mob-centre'><span className='dollar'>$</span>{product.price}</p>
                  <p className='product_stock'>
                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                      {product.stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>
                  <h4 className='quantity'>Quantity</h4>
                  <div className='product_quantity'>
                    <button>-</button>
                    <input readOnly type="number" value={1} />
                    <button>+</button>
                  </div>
                  <div>
                    <button className='cart_button'>Add To Cart</button>
                  </div>
                  <div className='product_desc'>
                    <h4>Description:</h4>
                    <p>{ product.desc }</p>
                  </div>
                </Grid>
              </Grid>
              <h2 className='page_heading2'> Reviews </h2>
              <ReviewSubmit product={product}/>
              <div className='product_review'>
                { product.reviews && product.reviews[0] ? renderReviews : <p className='no_reviews'>No Reviews Yet</p>}
              </div>
            </Container>
        )
      }
    </>
  )
}

export default ProductDetails