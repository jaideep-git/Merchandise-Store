import { Container } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import OrderInfo from "../../components/Shipping/OrderInfo";
import OrderSummary from "../../components/Shipping/OrderSummary";
import "./shippingStyles.css";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const OrderConfirm = () => {
  const navigate = useNavigate();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  // * CART TOTAL
  const cartTotal = cartItems.reduce((a, b) => a + b.price * b.quantity, 0);
  const shippingCharges = cartTotal > 50 ? 0 : 7;
  const tax = cartTotal * 0.13;

  const orderTotal = cartTotal + shippingCharges + tax;

  const confirmOrderHandler = () => {
    const orderData = {
      cartTotal,
      shippingCharges,
      tax,
      orderTotal,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(orderData));
    navigate("/payment");
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
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
        <Link to="/checkout" className="breadCrumb_link breadCrumb_linkActive">
          Confirmation
        </Link>
      </Breadcrumbs>
      <div className="orderConfirm_section">
        <h2>Shipping Information</h2>
        <div className="orderInfo_div">
          <OrderInfo shippingInfo={shippingInfo} />
        </div>
        <div>
          <OrderSummary orderItems={cartItems} />
          <div className="orderInfo_button" style={{marginBottom:"1rem"}}>
            <button className="orderConfirm_button" onClick={confirmOrderHandler}>Continue</button>
          </div>
          <Link to="/cart" className="breadCrumb_linkActive" >Return To Cart</Link>
        </div>
      </div>
    </Container>
  );
};

export default OrderConfirm;
