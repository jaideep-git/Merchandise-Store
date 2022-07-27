import React from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const PaymentInfo = () => {
  const { shippingInfo } = useSelector((state) => state.cart);
  console.log(shippingInfo);
  return (
    <div className="shippingInfo">
      <h2>Payment Information</h2>
      <TextField
        style={{ width: "100%" }}
        id="outlined-multiline-flexible"
        label="Card Number"
        InputProps={{
          type: "email",
        }}
      />
      <div className="addressFields">
        <TextField
          style={{ width: "100%" }}
          id="outlined-multiline-flexible"
          label="Expiry"
          InputProps={{
            type: "email",
          }}
        />
        <TextField
          style={{ width: "30%" }}
          id="outlined-multiline-flexible"
          label="CVV"
          InputProps={{
            type: "email",
          }}
        />
      </div>
      <div className="shippingInfo_button">
        <Link to="/payment"><button className="cart_button">Complete Order</button></Link> 
      </div>
    </div>
  );
};

export default PaymentInfo;
