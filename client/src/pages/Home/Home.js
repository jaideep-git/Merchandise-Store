import React, { useEffect } from 'react';
import ProductCard from '../../components/Product/ProductCard';
import Carousel from '../../components/Home/Carousel';
import './Home.css';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Title from '../../components/layout/Navbar/Title';
import { getProducts, clearErrors } from '../../store/actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/layout/Loader/Loading';
import { useAlert } from '../../components/Alert/AlertProvider'


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
      dispatch(clearErrors());
    }
  }, [error]);


  return (
    <>
      {fetching ?
        <Loading/>
        : <>
          <Title title={"Home Page"} />
          <div>
            <Carousel />
            <h2 className='page_heading'>Featured Products</h2>
            <Container maxWidth="lg">
              <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
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