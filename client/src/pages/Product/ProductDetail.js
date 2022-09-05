import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../store/actions/productAction";
import { addItemToCart } from "../../store/actions/cartAction";
import { useParams, Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "./Product.css";
import Review from "../../components/Product/Review";
import ReviewSubmit from "../../components/Product/ReviewSubmit";
import Loading from "../../components/layout/Loader/Loading";
import { NEW_REVIEW_RESET } from "../../store/constants/productConstants";
import BeatLoader from "react-spinners/BeatLoader";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [toCart, setToCart] = useState("");
  const [loading,setLoading] = useState(false);
  

  const { fetching, product } = useSelector(
    (state) => state.productDetails
  );

  const { success } = useSelector((state) => state.reviews);

  useEffect(() => {
    if (success) {
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, success]);

  // * Star Rating Options
  const options = {
    rating: product.rating,
    isSelectable: false,
    starEmptyColor: "rgba(20,20,20,0.1)",
    starRatedColor: "#FEEF00",
    starDimension: "17px",
    starSpacing: "1px",
  };

  const incrementQty = () => {
    if (qty < product.stock) {
      setQty(qty + 1);
    }
  };

  const decrementQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const addToCartHandler = () => {
    setLoading(true)
    dispatch(addItemToCart(id, qty));
    setTimeout(() => {
      setLoading(false)
      setToCart("Go to cart")
    }, 700)
  };

  // * Render Product Reviews
  const renderReviews =
    product.reviews &&
    product.reviews.map((rev) => {
      return <Review key={rev._id} review={rev} />;
    });

  return (
    <>
      {fetching ? (
        <Loading />
      ) : (
        <Container fixed className="product_container">
          <Grid container>
            <Grid item xs={12} sm={12} md={7} lg={6} className="product_image">
              <img src={product.imageUrl} alt="" />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={5}
              lg={6}
              className="product_details"
            >
              <p className="product_name mob-centre">{product.name}</p>
              <div className="product_ratings">
                <StarRatings {...options} />{" "}
                <span> ( {product.totalReviews} Reviews )</span>
              </div>
              <p className="product_price mob-centre">
                <span className="dollar">$</span>
                {product.price}
              </p>
              <p className="product_stock">
                <b
                  className={
                    product.stock < 1
                      ? "red"
                      : product.stock >= 10
                      ? `green`
                      : ""
                  }
                >
                  {product.stock < 1
                    ? "OutOfStock"
                    : product.stock >= 10
                    ? `InStock`
                    : ""}
                </b>
              </p>
              <p className="product_stock">
                <b className={"redColor"}>
                  {product.stock < 10 && !(product.stock <= 0)
                    ? `Only ${product.stock} left`
                    : ""}
                </b>
              </p>
              <h4 className="quantity">Quantity</h4>
              <div className="productDetail_button">
                <div className="product_quantity">
                  <button onClick={decrementQty}>-</button>
                  <input readOnly type="number" value={qty} />
                  <button onClick={incrementQty}>+</button>
                </div>
              </div>

              <div>
                <button className="cart_button" onClick={addToCartHandler}>
                  {loading ? <BeatLoader size={7} loading={loading} color="white"/> : 'Add To Cart '}
                </button>
                <p style={{marginTop:"9px",textDecoration:"underline",cursor:"pointer",fontSize:"1.1rem"}}><Link to="/cart">{toCart}</Link></p>
              </div>
              <div className="product_desc">
                <h4>Description:</h4>
                <p>{product.desc}</p>
              </div>
            </Grid>
          </Grid>
          <h2 className="page_heading2"> Reviews </h2>
          <ReviewSubmit product={product} id={id} />
          <div className="product_review">
            {product.reviews && product.reviews[0] ? (
              renderReviews.reverse()
            ) : (
              <p className="no_reviews">No Reviews Yet</p>
            )}
          </div>
        </Container>
      )}
    </>
  );
};

export default ProductDetails;
