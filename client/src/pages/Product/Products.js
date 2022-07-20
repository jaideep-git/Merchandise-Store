import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ProductCard from "../../components/Product/ProductCard";
import { getProducts, clearErrors } from "../../store/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/layout/Loader/Loading";
import { useParams } from "react-router-dom";
import { useAlert } from "../../components/Alert/AlertProvider";
import Pagination from "react-js-pagination";
import "./Product.css";

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { fetching, error, products,productCount, resultPerPage, filteredProductCount } = useSelector((state) => state.products);

  const { search } = useParams();
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [merchandise, setMerchandise] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    dispatch(getProducts(search, page, price, merchandise, rating));
  }, [dispatch, search, page, price, merchandise, rating]);

  useEffect(() => {
    if (error) {
      alert({
        message: error,
      });
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);

  // * Pagination Handller
  const handlePageChange = (e) => {
    setPage(e);
    console.log(page);
  };

  return (
    <>
      {fetching ? (
        <Loading />
      ) : (
        <Container maxWidth="lg">
          <h2 className="page_heading">
            {search ? `Search Results` : "All Products"}
          </h2>
          {search && products.length ? (
            <p className="search_results">
              {" "}
              {products.length} results for "{search}"{" "}
            </p>
          ) : (
            ""
          )}
          {search && !products.length ? (
            <p className="search_results">No Results Found</p>
          ) : (
            ""
          )}
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 2, sm: 2, md: 2 }}
          >
            {products &&
              products.map((product) => {
                return (
                  <Grid key={product._id} item xs={6} sm={6} md={3} lg={3}>
                    <ProductCard product={product} />
                  </Grid>
                );
              })}
          </Grid>
          {
            resultPerPage <= filteredProductCount && (
              <div className="paginationBox">
                <Pagination
                activePage={page}
                itemsCountPerPage={resultPerPage}
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
            )  
          }  
        </Container>
      )}
    </>
  );
};

export default Products;
