import { Container, Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import OrderSummary from "../../components/Shipping/OrderSummary";
import OrderInfo from "../../components/Shipping/OrderInfo";
import PaymentInfo from "../../components/Shipping/PaymentInfo";
import "./shippingStyles.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

const Payment = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  
  return (
    <Container maxWidth="lg" className="checkoutContainer">
      <Breadcrumbs
        aria-label="breadcrumb"
        style={{ backgroundColor: "white", marginBottom: "1rem" }}
      >
        <Link to="/cart" className="breadCrumb_link">
          Cart
        </Link>
        <Link to="/checkout" className="breadCrumb_link">
          Checkout
        </Link>
        <Link to="/confirm" className="breadCrumb_link">
          Confirmation
        </Link>
        <Link to="/payment" className="breadCrumb_link breadCrumb_linkActive">
          Payment
        </Link>
      </Breadcrumbs>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={7} xl={7}>
          <h2 style={{ marginBottom: "2rem" }}>Payment Information</h2>
          <div className="orderInfo_div paymentOrderInfo" >
            <OrderInfo shippingInfo={shippingInfo} />
          </div>
          <h2 style={{ marginBottom: "1rem" }}>Card Details</h2>
          <PaymentInfo />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={5} xl={5} className="mobHide">
          <OrderSummary orderItems={cartItems} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Payment;
