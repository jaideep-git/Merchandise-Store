import React, { useEffect } from 'react';
import ProductCard from '../Product/ProductCard';
import Carousel from './Carousel';
import './Home.css';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Title from '../layout/Navbar/Title';
import { getProducts } from '../../store/actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../layout/Loader/Loading';
import { useAlert } from '../Alerts/AlertProvider'


function Home() {
  const dispatch = useDispatch(); 
  const alert = useAlert();
  const { fetching, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
 
  useEffect(() => {
    if (error) {
      alert({
        message:error
      });
    }
  }, [error, alert]);

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