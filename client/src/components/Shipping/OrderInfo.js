import React from "react";
import { Link } from "react-router-dom";

const OrderInfo = ({ shippingInfo }) => {
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  return (
    <div className="orderInfo">
      <div className="info_content">
        <div className="content_flex">
          <div>
            <h3>Contact</h3>
          </div>
          <div className="content_flex2">
            <p>{shippingInfo.email}</p>
            <Link to="/checkout">
              <h4>Change</h4>
            </Link>
          </div>
        </div>
        <div style={{ border: "0.1px solid #f1efef" }}></div>
        <div className="content_flex">
          <div>
            <h3>Address</h3>
          </div>
          <div className="content_flex2">
            <p>{address}</p>
            <Link to="/checkout">
              <h4>Change</h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
