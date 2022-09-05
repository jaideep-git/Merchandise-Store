import React from "react";
import { Link } from "react-router-dom";

const OrderListItem = ({ order }) => {
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
    <div className="orderListItem">
      <div className="orderItem_header">
        <span className="orderHeader_item">Order</span>
        <span className="orderHeader_item">Order Placed</span>
        <span className="orderHeader_item">Total</span>
        <span className="orderHeader_item">Status</span>
      </div>
      <div className="orderList_item">
        <div className="orderList_subItem">
          <p>#{order._id}</p>
        </div>
        <div className="orderList_subItem">
          <p>
            {orderDate[2]} {months[orderMonth[1]]} {orderDate[0]}
          </p>
        </div>
        <div className="orderList_subItemPrice">
          <p>${order.totalPrice}</p>
        </div>
        <div className="orderList_subItem">
          <p>{order.orderStatus}</p>
        </div>
        <div className="orderList_subItem">
          <Link to={`/order/${order._id}`}>
            <p className="orderDetails">Order Details</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderListItem;
