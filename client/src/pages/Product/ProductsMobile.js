import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ProductCard from "../../components/Product/ProductCard";
import { getProducts } from "../../store/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/layout/Loader/Loading";
import { useParams } from "react-router-dom";
import { useAlert } from "../../components/Alert/AlertProvider";
import Pagination from "react-js-pagination";
import StarRatings from "react-star-ratings";
import MobileFilterBox from "../../components/Product/MobileFilterBox";
import "./Product.css";

const ProductsMobile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  let {
    fetching,
    error,
    productCount,
    paginatedProducts,
    paginatedProductCount,
  } = useSelector((state) => state.products);

  const { search } = useParams();
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [merchandise, setMerchandise] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    dispatch(getProducts(search, page, price, merchandise, rating));
  }, [dispatch, search, page, price, merchandise, rating]);

  const [priceSelected, setPriceSelected] = useState();
  const [merchSelected, setMerchSelected] = useState();
  const [ratingSelected, setRatingSelected] = useState();

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
  const priceFilter = [
    [0, 25],
    [25, 50],
    [50, 100],
    [100, 10000],
  ];
  
  const merchandiseFilter = [
    "The Office",
    "F.R.I.E.N.D.S",
    "Stranger Things",
    "Games of Throne",
  ];

  const priceSelectionHandler = () => {
    setPrice([0, 10000]);
    setPriceSelected("");
  };

  const merchSelectionHandler = () => {
    setMerchandise("");
    setMerchSelected("");
  };

  const ratingSelectionHandler = () => {
    setRating(0);
    setRatingSelected("");
  };

  return (
    <>
      {fetching ? (
        <Loading />
      ) : (
        <Container maxWidth="lg">
          <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
            <Grid
              item
              xs={12}
              sm={12}
              md={2}
              lg={2}
              xl={2}
              className={
                search ? "filter_sectionSearchMob" : "filter_sectionProductMob"
              }
            >
              <MobileFilterBox>
                {/* Filter Section */}
                <div className="filterBox">
                  {/* price filter */}
                  <div className="price_filter">
                    <h3 className="filterHeading">Price</h3>
                    <ul className="filter_list">
                      <li>
                        {priceSelected === 1 ? (
                          <input
                            readOnly
                            type="checkbox"
                            className="filterCheckbox"
                            onClick={priceSelectionHandler}
                            checked
                          />
                        ) : (
                          ""
                        )}

                        <span
                          onClick={() => {
                            setPrice(priceFilter[0]);
                            setPriceSelected(1);
                          }}
                        >
                          Under $25
                        </span>
                      </li>
                      <li>
                        {priceSelected === 2 ? (
                          <input
                            readOnly
                            type="checkbox"
                            className="filterCheckbox"
                            onClick={priceSelectionHandler}
                            checked
                          />
                        ) : (
                          ""
                        )}

                        <span
                          onClick={() => {
                            setPrice(priceFilter[1]);
                            setPriceSelected(2);
                          }}
                        >
                          $25 to $50
                        </span>
                      </li>
                      <li>
                        {priceSelected === 3 ? (
                          <input
                            readOnly
                            type="checkbox"
                            className="filterCheckbox"
                            onClick={priceSelectionHandler}
                            checked
                          />
                        ) : (
                          ""
                        )}

                        <span
                          onClick={() => {
                            setPrice(priceFilter[2]);
                            setPriceSelected(3);
                          }}
                        >
                          $50 to $100
                        </span>
                      </li>
                      <li>
                        {priceSelected === 4 ? (
                          <input
                            readOnly
                            type="checkbox"
                            className="filterCheckbox"
                            onClick={priceSelectionHandler}
                            checked
                          />
                        ) : (
                          ""
                        )}

                        <span
                          className="na"
                          onClick={(e) => {
                            setPrice(priceFilter[3]);
                            setPriceSelected(4);
                          }}
                        >
                          $100 above
                        </span>
                      </li>
                    </ul>
                  </div>
                  {/* Merchandise filter */}
                  <div className="merchandise_filter">
                    <h3 className="filterHeading">Merchandise</h3>
                    <ul className="filter_list">
                      {merchandiseFilter.map((merch, index) => (
                        <li key={index}>
                          {merchSelected === index ? (
                            <input
                              readOnly
                              type="checkbox"
                              className="filterCheckbox"
                              onClick={merchSelectionHandler}
                              checked
                            />
                          ) : (
                            ""
                          )}
                          <span
                            onClick={() => {
                              console.log(merchSelected, index);
                              setMerchandise(merch);
                              setMerchSelected(index);
                            }}
                          >
                            {merch}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Rating filter */}
                  <div className="review_filter">
                    <h3 className="filterHeading">Customer Review</h3>
                    <ul className="filter_list">
                      <li className="rating_li">
                        {ratingSelected === 4 ? (
                          <input
                            readOnly
                            type="checkbox"
                            className="filterCheckbox"
                            onClick={ratingSelectionHandler}
                            checked
                          />
                        ) : (
                          ""
                        )}
                        <div
                          onClick={() => {
                            setRatingSelected(4);
                            setRating(4);
                          }}
                        >
                          <StarRatings {...options} rating={4} /> & Up
                        </div>
                      </li>
                      <li className="rating_li">
                        {ratingSelected === 3 ? (
                          <input
                            readOnly
                            type="checkbox"
                            className="filterCheckbox"
                            onClick={ratingSelectionHandler}
                            checked
                          />
                        ) : (
                          ""
                        )}
                        <div
                          onClick={() => {
                            setRatingSelected(3);
                            setRating(3);
                          }}
                        >
                          <StarRatings {...options} rating={3} /> & Up
                        </div>
                      </li>
                      <li className="rating_li">
                        {ratingSelected === 2 ? (
                          <input
                            readOnly
                            type="checkbox"
                            className="filterCheckbox"
                            onClick={ratingSelectionHandler}
                            checked
                          />
                        ) : (
                          ""
                        )}
                        <div
                          onClick={() => {
                            setRatingSelected(2);
                            setRating(2);
                          }}
                        >
                          <StarRatings {...options} rating={2} /> & Up
                        </div>
                      </li>
                      <li className="rating_li">
                        {ratingSelected === 1 ? (
                          <input
                            readOnly
                            type="checkbox"
                            className="filterCheckbox"
                            onClick={ratingSelectionHandler}
                            checked
                          />
                        ) : (
                          ""
                        )}
                        <div
                          onClick={() => {
                            setRatingSelected(1);
                            setRating(1);
                          }}
                        >
                          <StarRatings {...options} rating={1} /> & Up
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </MobileFilterBox>
            </Grid>
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
              {search ? (
                <h2 className="search_headingMob">Search Results</h2>
              ) : (
                <h2 className="page_heading">All Products</h2>
              )}
              {search && productCount ? (
                <p className="search_results">
                  {productCount} results for "{search}"
                </p>
              ) : (
                ""
              )}
              {search && !productCount ? (
                <p className="search_results">No Results Found</p>
              ) : (
                ""
              )}
              <Grid
                container
                rowSpacing={2}
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

export default ProductsMobile;
