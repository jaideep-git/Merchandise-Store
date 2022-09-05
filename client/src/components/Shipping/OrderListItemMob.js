import React from "react";
import { Link } from "react-router-dom";

const OrderListItemMob = ({order}) => {
  const orderPaidAt = order.paidAt.split("T")[0];
  const orderDate = orderPaidAt.split("-");
  const orderMonth = orderDate[1].split("0");
  const months = [
    "months",
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <div className="orderListItemMob">
      <div>
        <span style={{ fontWeight: "600", fontSize: "1.1rrem" }}>Order -</span>
        <span> #{order._id}</span>
      </div>
      <div>
        <span style={{ fontWeight: "600", fontSize: "1.1rrem" }}>
          Placed On -
        </span>
        <span> {orderDate[2]} {months[orderMonth[1]]} {orderDate[0]} </span>
      </div>
      <div>
        <span style={{ fontWeight: "600", fontSize: "1.1rrem" }}>
          Total -
        </span>
        <span> ${order.totalPrice} </span>
      </div>
      <div>
        <span style={{ fontWeight: "600", fontSize: "1.1rrem" }}>Status -</span>
        <span> {order.orderStatus}</span>
      </div>
      <div className="orderList_subItem">
          <Link to={`/order/${order._id}`}>
            <p className="orderDetails">Order Details</p>
          </Link>
        </div>
    </div>
  );
};

export default OrderListItemMob;
