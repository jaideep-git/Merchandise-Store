import { Container, Grid } from "@mui/material";
import React from "react";
import OrderSummary from "../../components/Shipping/OrderSummary";
import PaymentInfo from "../../components/Shipping/PaymentInfo";
import './shippingStyles.css'

const Payment = () => {
  return (
    <Container maxWidth="lg" className="checkoutContainer">
      <Grid container>
        <Grid item xs={6} sm={6} md={6} lg={7} xl={7}>
          <PaymentInfo />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={5} xl={5}>
          <OrderSummary />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Payment