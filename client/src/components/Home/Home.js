import React, { useEffect } from 'react';
import ProductCard from '../Product/ProductCard';
import Carousel from './Carousel';
import './Home.css';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Title from '../layout/Navbar/Title';
import { getProduct } from '../../store/actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../layout/Loader/Loading';


function Home() {
  const dispatch = useDispatch();
  const { fetching, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct())
  }, [dispatch]);

  return (
    <>
      {fetching ?
        <Loading/>
        : <>
          <Title title={"Home Page"} />
          <div>
            <Carousel />
            <h2>Featured Products</h2>
            <Container maxWidth="xl">
              <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
                {products && products.map(product => {
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