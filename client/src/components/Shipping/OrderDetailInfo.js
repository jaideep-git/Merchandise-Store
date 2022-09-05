import React from "react";

const OrderDetailInfo = ({ shippingInfo }) => {
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
          </div>
        </div>
        <div style={{ border: "0.1px solid #f1efef" }}></div>
        <div className="content_flex">
          <div>
            <h3>Address</h3>
          </div>
          <div className="content_flex2">
            <p>{address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailInfo;
