import { set } from 'mongoose';
import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import './ProductStyles.css';
import { createReview } from '../../store/actions/productAction';
import { useDispatch,useSelector } from "react-redux";


const ReviewSubmit = ({ product,id }) => {
  const [rating,setRating] = useState(1);
  const dispatch = useDispatch()
  const [comment, setComment] = useState("");

  const { success } = useSelector(
    (state) => state.reviews
  );

  const { isAuthenticated } = useSelector( (state) => state.user);


  useEffect(()=>{
    if(!success){
      setRating(1);
      setComment("");
    }
  }, [success])

  // declaring ratings variables 
  let ratingFive = 0;
  let ratingFour = 0;
  let ratingThree = 0;
  let ratingTwo = 0;
  let ratingOne = 0;

  // * Counting Each Rating
  const eachRatingCount = product.reviews && product.reviews.forEach((rev) => {
    switch (rev.rating) {
      case 1:
        ratingOne +=1
        break;
      case 2:
        ratingTwo += 1;
        break;
      case 3:
        ratingThree += 1;
        break;
      case 4:
        ratingFour += 1;
        break;
      case 5:
        ratingFive += 1;
        break;
      default:
    }
  })

  // * Calculating each Rating Percentage
  const ratingPercantageOne = ratingOne / product.totalReviews * 100;
  const ratingPercantageTwo = ratingTwo / product.totalReviews * 100;
  const ratingPercantageThree = ratingThree / product.totalReviews * 100;
  const ratingPercantageFour = ratingFour / product.totalReviews * 100;
  const ratingPercantageFive = ratingFive / product.totalReviews * 100;

  // * Change Start Rating on-click
  function changeReviewRating( newRating ) {
    setRating(newRating);
  }

  // * Star Rating component props
  const ratingOptions1 = {
    isSelectable: false,
    starEmptyColor: "rgba(20,20,20,0.1)",
    starRatedColor: "#FEEF00",
    starDimension:"20px",
    starSpacing:"1px",
  };

  const ratingOptions2 = {
    rating:rating,
    isSelectable: true,
    starEmptyColor: "rgba(20,20,20,0.1)",
    starRatedColor: "#FEEF00",
    starDimension:"20px",
    starSpacing: "1px",
    changeRating:changeReviewRating,
    starHoverColor: "#fbcd0a",
    isAggregateRating:true
  };
  
  const review = {
    rating,
    comment,
    id
  }

  const reviewSubmitHandler = () => {
    if(isAuthenticated){
      dispatch(createReview(review))
    }
  };

  return (
    <div className='customer_reviews'>

      {/* Rating Overall Section */}
      <div className='review_section'>
        <div className='review_section1'>
          <h3>Customer Reviews</h3>
          <div className='product_rating3'>
            <StarRatings {...ratingOptions1} rating={ product.rating } /> <span> ( {product.rating} out of 5 )</span>
          </div>
        </div>

        {/* Each Rating Overall  */}
        <div className='review_section2'>
          <div className='review_rating'>
            <StarRatings {...ratingOptions1} rating={5}/> 
            <div className='rating_bar'>
              <div className={"bar2"} style={{width:`${ratingPercantageFive ? ratingPercantageFive : 0  }%`}} />
            </div>
            <div className='rating_percantage'>
              <p>{ ratingPercantageFive ? ratingPercantageFive : 0  }%</p>
              <p>({ratingFive})</p>
            </div>
          </div>

          <div className='review_rating'>
            <StarRatings {...ratingOptions1} rating={4}/> 
            <div className='rating_bar'>
              <div className={"bar2"} style={{width:`${ratingPercantageFour ? ratingPercantageFour : 0 }%`}} />
            </div>
            <div className='rating_percantage'>
              <p>{ ratingPercantageFour ? ratingPercantageFour : 0  }%</p>
              <p>({ratingFour})</p>
            </div>
          </div>

          <div className='review_rating'>
            <StarRatings {...ratingOptions1} rating={3}/> 
            <div className='rating_bar'>
              <div className={"bar2"} style={{width:`${ ratingPercantageThree ? ratingPercantageThree : 0 }%`}} />
            </div>
            <div className='rating_percantage'>
              <p>{ ratingPercantageThree ? ratingPercantageThree : 0  }%</p>
              <p>({ratingThree})</p>
            </div>
          </div>

          <div className='review_rating'>
            <StarRatings {...ratingOptions1} rating={2}/> 
            <div className='rating_bar'>
              <div className={"bar2"} style={{width:`${ratingPercantageTwo ? ratingPercantageTwo : 0  }%`}} />
            </div>
            <div className='rating_percantage'>
              <p>{ ratingPercantageTwo ? ratingPercantageTwo : 0  }%</p>
              <p>({ratingTwo})</p>
            </div>
          </div>

          <div className='review_rating'>
            <StarRatings {...ratingOptions1} rating={1}/> 
            <div className='rating_bar'>
              <div className={"bar2"} style={{width:`${ratingPercantageOne ? ratingPercantageOne : 0 }%`}} />
            </div>
            <div className='rating_percantage'>
              <p>{ ratingPercantageOne ? ratingPercantageOne : 0  }%</p>
              <p>({ratingOne})</p>
            </div>
          </div>
        </div>
      </div>

      {/* Write A Review Section */}
      <div className='review_form'>
        <h3>Write a Review</h3>
        <div className='form_section'>
          <h4>Rating</h4>
          <p style={{textAlign:"centre", color:"red", marginBottom:"0.5rem"}}>{ !isAuthenticated ? 'Please Login To Review' : ''}</p>
          <StarRatings {...ratingOptions2} /> 
        </div>

        <div className='form_section'>
          <h4>Review</h4>
          <textarea name="" className='review_textField' rows="10" value={comment} onChange={(e)=> setComment(e.target.value)}>
          </textarea>
        </div>
        <button className="submitButton" onClick={reviewSubmitHandler}>Submit</button>
      </div>
    </div>
  )
}

export default ReviewSubmit