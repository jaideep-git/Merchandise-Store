import React, { useEffect, useState } from "react";
import "./Product.css";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import ProductCard from "../../components/Product/ProductCard";
import { getProducts } from "../../store/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/layout/Loader/Loading";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import StarRatings from "react-star-ratings";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  let singleMerch = searchParams.get("merch");
  let { fetching, productCount, paginatedProducts, paginatedProductCount } =
    useSelector((state) => state.products);

  const { search } = useParams();
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState();
  const [merchandise, setMerchandise] = useState("");
  const [merch, setMerch] = useState(singleMerch);
  const [rating, setRating] = useState(0);
  useEffect(() => {
    if (merch) {
      dispatch(getProducts(search, page, price, merch, rating));
    } else {
      dispatch(getProducts(search, page, price, merchandise, rating));
    }
  }, [dispatch, search, page, price, merchandise, merch, rating]);

  // * Pagination Handller
  const handlePageChange = (e) => {
    setPage(e);
  };

  const options = {
    isSelectable: false,
    starEmptyColor: "rgba(20,20,20,0.1)",
    starRatedColor: "#FEEF00",
    starDimension: "17px",
    starSpacing: "1px",
  };

  // * FilterBox Options
  const merchandiseFilter = [
    "The Office",
    "F.R.I.E.N.D.S",
    "Stranger Things",
    "Game of Thrones",
  ];

  const priceSelectionHandler = (event) => {
    let priceValue = event.target.value;
    setPrice(priceValue.split(","));
    setPage(1);
  };

  const merchSelectionHandler = (event) => {
    setMerchandise(event.target.value);
    setPage(1);
    setMerch("");
  };

  const ratingSelectionHandler = (event) => {
    setRating(event.target.value);
    setPage(1);
  };

  return (
    <>
      {fetching ? (
        <Loading />
      ) : (
        <Container maxWidth="lg">
          <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
            <Grid
              item
              xs={6}
              sm={6}
              md={2}
              lg={2}
              xl={2}
              className={
                search ? "filter_sectionSearch" : "filter_sectionProduct"
              }
            >
              {/* Filter Section */}
              <div className="filterBox">
                <h2>Filter</h2>
                {/* price filter */}
                <div className="price_filter">
                  <h3 className="filterHeading">Price</h3>
                  <RadioGroup
                    name="controlled-radio-buttons-group"
                    value={`${price}`}
                    onChange={priceSelectionHandler}
                  >
                    <FormControlLabel
                      value="0,25"
                      control={<Radio color="success" />}
                      label="Under $25"
                    />
                    <FormControlLabel
                      value="25,100"
                      control={<Radio color="success" />}
                      label="$25 to $50"
                    />
                    <FormControlLabel
                      value="50,100"
                      control={<Radio color="success" />}
                      label="$50 to $100"
                    />
                    <FormControlLabel
                      value="100,10000"
                      control={<Radio color="success" />}
                      label="$100 above"
                    />
                  </RadioGroup>
                  <span
                    onClick={() => {
                      setPrice();
                    }}
                    className="clearFilter"
                  >
                    Clear filter
                  </span>
                </div>
                {/* Merchandise filter */}
                <div className="merchandise_filter">
                  <h3 className="filterHeading">Merchandise</h3>
                  <RadioGroup
                    name="controlled-radio-buttons-group"
                    value={merchandise}
                    onChange={merchSelectionHandler}
                  >
                    {merchandiseFilter.map((merch, index) => (
                      <FormControlLabel
                        value={merch}
                        key={index}
                        control={<Radio color="success" />}
                        label={merch}
                      />
                    ))}
                  </RadioGroup>
                  <span
                    onClick={() => {
                      setMerchandise("");
                    }}
                    className="clearFilter"
                  >
                    Clear filter
                  </span>
                </div>
                {/* Rating filter */}
                <div className="review_filter">
                  <h3 className="filterHeading">Customer Review</h3>
                  <RadioGroup
                    name="controlled-radio-buttons-group"
                    value={rating}
                    onChange={ratingSelectionHandler}
                  >
                    <FormControlLabel
                      value={5}
                      control={<Radio color="success" />}
                      label={<StarRatings {...options} rating={5} />}
                    />
                    <FormControlLabel
                      value={4}
                      control={<Radio color="success" />}
                      label={<StarRatings {...options} rating={4} />}
                    />
                    <FormControlLabel
                      value={3}
                      control={<Radio color="success" />}
                      label={<StarRatings {...options} rating={3} />}
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio color="success" />}
                      label={<StarRatings {...options} rating={2} />}
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio color="success" />}
                      label={<StarRatings {...options} rating={1} />}
                    />
                  </RadioGroup>
                  <span
                    onClick={() => {
                      setRating(0);
                    }}
                    className="clearFilter"
                  >
                    Clear filter
                  </span>
                </div>
              </div>
            </Grid>
            {/* Products Section */}
            <Grid item xs={6} sm={6} md={10} lg={10} xl={10}>
              {search ? (
                <h2 className="page_heading">Search Results</h2>
              ) : !merchandise && !merch ? (
                <h2 className="page_heading">All Products</h2>
              ) : (
                <h2 className="page_heading">{merchandise || merch}</h2>
              )}
              {search && productCount ? (
                <p className="search_results">
                  {productCount} results for "{search}"
                </p>
              ) : (
                ""
              )}
              {!productCount ? (
                <p className="search_results">No Results Found</p>
              ) : (
                ""
              )}
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 2, sm: 2, md: 2 }}
              >
                {paginatedProducts &&
                  paginatedProducts.map((product) => {
                    return (
                      <Grid key={product._id} item xs={6} sm={6} md={3} lg={3}>
                        <ProductCard product={product} />
                      </Grid>
                    );
                  })}
              </Grid>
              {paginatedProductCount === productCount ? (
                ""
              ) : (
                <div className="paginationBox">
                  <Pagination
                    activePage={page}
                    itemsCountPerPage={8}
                    totalItemsCount={productCount}
                    onChange={handlePageChange}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
              )}
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Products;
