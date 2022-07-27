import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import ProductCard from '../../components/Product/ProductCard';
import Carousel from '../../components/Home/Carousel';
import './Home.css';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Title from '../../components/layout/Navbar/Title';
import { getProducts} from '../../store/actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/layout/Loader/Loading';

function Home() {
  const dispatch = useDispatch(); 
  const { fetching, error, paginatedProducts } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
 
  return (
    <>
      {fetching ?
        <Loading/>
        : <>
          <Title title={"Home Page"} />
          <div>
            <Link to="/products"> <Carousel /> </Link> 
            <h2 className='page_heading'>Featured Products</h2>
            <Container maxWidth="lg">
              <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                {paginatedProducts && paginatedProducts.map(product => {
                  return (
                    <Grid key={product._id} item xs={6} sm={6} md={3} lg={3}>
                      <ProductCard  product={product}/>
                    </Grid>
                  )
                } )}
              </Grid>
            </Container>
          </div>
        </>      
      }
    </>
  )
}

export default Home