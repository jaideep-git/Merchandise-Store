import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/Product/ProductCard";
import Carousel from "../../components/Home/Carousel";
import "./Home.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Title from "../../components/layout/Navbar/Title";
import { getProducts } from "../../store/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/layout/Loader/Loading";
import friends from "../../assets/b68001ade4229082ceec8808bf6ed774.png";
import office from "../../assets/185ef732fdffb87019634817ef76b162.jpg";
import ST from "../../assets/stranger-things-text-wallpaper-2560x1600_7.jpg";
import GOT from "../../assets/game-of-thrones-logo.jpg";

function Home() {
  const dispatch = useDispatch();
  const { fetching,paginatedProducts } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      {fetching ? (
        <Loading />
      ) : (
        <>
          <Title title={"Home Page"} />
          <div>
            <Link to="/products">
              <Carousel />
            </Link>
            <h2 className="page_heading">Popular Shows</h2>
            <Container maxWidth="lg">
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 1, md: 2 }}
              >
                <Grid item xs={6} sm={6} md={4} lg={3}>
                  <div className="showPoster">
                    <Link to="/products?merch=F.R.I.E.N.D.S">
                      <img src={friends} alt="" />
                    </Link>
                  </div>
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={3}>
                  <div className="showPoster">
                    <Link to="/products?merch=The Office">
                      <img src={office} alt="" />
                    </Link>
                  </div>
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={3}>
                  <div className="showPoster">
                    <Link to="/products?merch=Stranger Things">
                      <img src={ST} alt="" />
                    </Link>
                  </div>
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={3}>
                  <div className="showPoster">
                    <Link to="/products?merch=Game of Thrones">
                      <img src={GOT} alt="" />
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </Container>

            <h2 className="page_heading">Featured Products</h2>
            <Container maxWidth="lg">
              <Grid
                container
                rowSpacing={3}
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
            </Container>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
