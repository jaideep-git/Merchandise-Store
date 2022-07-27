import { Container, Grid } from "@mui/material";
import React from "react";
import OrderSummary from "../../components/Shipping/OrderSummary";
import ShippingInfo from "../../components/Shipping/ShippingInfo";

import './shippingStyles.css'

const Checkout = () => {
  return (
    <Container maxWidth="lg" className="checkoutContainer">
      <Grid container>
        <Grid item xs={6} sm={6} md={6} lg={7} xl={7}>
          <ShippingInfo />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={5} xl={5} className="orderSummary_section">
          <OrderSummary />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
