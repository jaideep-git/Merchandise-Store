import { Container } from "@mui/material";
import React from "react";
import CartItem from "../../components/Cart/CartItem";
import { Link } from "react-router-dom";
import "./cartStyles.css";
import { useSelector } from "react-redux";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const cartTotal = cartItems.reduce((a, b) => a + b.price * b.quantity, 0);

  const renderCartItems =
    cartItems &&
    cartItems.map((item) => {
      return <CartItem key={item.product} item={item} />;
  });

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
          <span className="cartHeader_item">Total</span>
        </div>
        {renderCartItems}
      </div>
      <div className="totalSection">
        <div className="subTotal">
          <span
            className="subTotal_Price"
            style={{
              fontSize: "1.3rem",
              fontWeight: "550",
              marginRight: "10px",
            }}
          >
            Total:
          </span>
          <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>${cartTotal}</span>
          <Link to="/checkout"><button className="cart_button">Checkout</button></Link>
        </div>
      </div>
        </>
      ) : (
        <>
          <p style={{textAlign:"center"}}>Your cart is empty</p>
        </>
      )}
    </Container>
  );
};

export default Cart;
