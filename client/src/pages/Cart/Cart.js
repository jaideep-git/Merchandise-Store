import { Container } from "@mui/material";
import React from "react";
import CartItem from "../../components/Cart/CartItem";
import { useNavigate } from "react-router-dom";
import "./cartStyles.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const cartTotal = cartItems.reduce((a, b) => a + b.price * b.quantity, 0);
  const shippingCharges = cartTotal > 50 ? 0 : 7;
  const tax = cartTotal * 0.13;

  const subTotal = cartTotal + shippingCharges + tax;

  const renderCartItems =
    cartItems &&
    cartItems.map((item) => {
      return <CartItem key={item.product} item={item} />;
    });

  const checkoutHandler = () => {
    navigate("/login?redirect=checkout");
  };

  return (
    <Container maxWidth="md">
      <h2 className="page_heading"> Your Cart </h2>
      {cartItems && cartItems[0] ? (
        <>
          <div className="cart_section">
            <div className="cart_header">
              <span className="cartHeader_item">Product</span>
              <span className="cartHeader_item"></span>
              <span className="cartHeader_item">Quantity</span>
              <span className="cartHeader_item">Subtotal</span>
            </div>
            {renderCartItems}
          </div>
          <div className="totalSummary">
            <div className="cartPadding">
              <div className="orderSummary_total">
                <h4>Subtotal</h4>
                <p>${cartTotal}</p>
              </div>
            </div>
            <div className="cartPadding">
              <div className="orderSummary_total">
                <h4>Tax</h4>
                <p>${tax.toFixed(2)}</p>
              </div>
            </div>
            <div className="cartPadding">
              <div className="orderSummary_total">
                <h4>Delivery Fees</h4>
                <p>${shippingCharges}</p>
              </div>
            </div>
            <div className="cartPadding" style={{borderTop:"1px solid rgb(222, 218, 218)"}} >
              <div className="orderSummary_totalPartCart">
                <h4>Total</h4>
                <p>${subTotal}</p>
              </div>
            </div>
            <div className="cartButtonDiv">
              <Link to="/products" className="cartLink">Add More</Link>
              <button className="mainCartButton" onClick={checkoutHandler}>
                Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <p style={{ textAlign: "center" }}>Your cart is empty</p>
        </>
      )}
    </Container>
  );
};

export default Cart;
