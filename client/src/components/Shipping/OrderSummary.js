import React from "react";
import OrderItem from "./OrderItem";
import { useSelector } from "react-redux";

const OrderSummary = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const cartTotal = cartItems.reduce((a, b) => a + b.price * b.quantity, 0);

  const renderCartItems =
    cartItems &&
    cartItems.map((item) => {
      return <OrderItem key={item.product} item={item} />;
    });
    
  return (
    <div className="orderSummary">
      <h2>Order Summary</h2>
      <div style={{marginTop:"25px"}}>{renderCartItems}</div>
      <div className="orderSummary_total">
        <h3>Total</h3>
        <p>${cartTotal}</p>
      </div>
    </div>
  );
};

export default OrderSummary;
