import React from "react";
import OrderItem from "./OrderItem";

const OrderSummary = ({orderItems}) => {
  const cartTotal = orderItems.reduce((a, b) => a + b.price * b.quantity, 0);
  const shippingCharges = cartTotal > 50 ? 0 : 7;
  const tax = cartTotal * 0.13;

  const subTotal = cartTotal + shippingCharges + tax;

  const renderCartItems =
    orderItems &&
    orderItems.map((item) => {
      return <OrderItem key={item.product} item={item} />;
    });

  return (
    <div className="orderSummary">
      <h2>Order Summary</h2>
      <div style={{ marginTop: "25px" }}>{renderCartItems}</div>
      <div className="totalSummary">
        <div className="orderSummary_total">
          <h4>Subtotal</h4>
          <p>${cartTotal}</p>
        </div>
        <div className="orderSummary_total">
          <h4>Tax</h4>
          <p>${tax.toFixed(2)}</p>
        </div>
        <div className="orderSummary_total">
          <h4>Delivery Fees</h4>
          <p>${shippingCharges}</p>
        </div>
        <div className="orderSummary_totalPart">
          <h4>Total</h4>
          <p>${subTotal}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
