import React from "react";
import { Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import OrderSummary from "../../components/Shipping/OrderSummary";
import ShippingInfo from "../../components/Shipping/ShippingInfo";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useSelector } from "react-redux";
import "./shippingStyles.css";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <Container maxWidth="lg" className="checkoutContainer">
      <Breadcrumbs
        aria-label="breadcrumb"
        style={{ backgroundColor: "white", marginBottom: "1rem" }}
      >
        <Link to="/cart" className="breadCrumb_link">
          Cart
        </Link>
        <Link to="/checkout" className="breadCrumb_link breadCrumb_linkActive">
          Checkout
        </Link>
      </Breadcrumbs>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={7} xl={7}>
          <ShippingInfo />
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={5}
          xl={5}
          className="orderSummary_section"
        >
          <OrderSummary orderItems={cartItems} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
