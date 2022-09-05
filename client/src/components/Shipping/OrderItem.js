import React from "react";
import { Link } from "react-router-dom";

const OrderItem = ({ item }) => {
  const subTotal = item.price * item.quantity;

  return (
    <div className="orderItem">
      <div className="orderItem_info">
        <div >
          <div className="orderItem_img">
            <img src={item.imageUrl} alt="" />
          </div>
          <span className="circle">{item.quantity}</span>
        </div>
        <div className="orderItemName">
          <Link to={`/product/${item.product}`} className="cartProductName">{item.name}</Link>
          <p className="cartPrice">${item.price}</p>
        </div>
      </div>
      <div className="orderItemPrice">
        <p>${subTotal}</p>
      </div>
    </div>
  );
};

export default OrderItem;
