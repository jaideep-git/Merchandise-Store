import { Container } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import OrderSummary from "../../components/Shipping/OrderSummary";
import Loading from "../../components/layout/Loader/Loading";

const OrderSucess = () => {
  const navigate = useNavigate();
  const { order,fetching  } = useSelector((state) => state.newOrder);

  const continueShoppingHandler = () => {
    navigate("/");
  };

  return (
    <>
      {fetching ? (
        <Loading />
      ) : (
        <Container maxWidth="md" style={{ marginTop: "2rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h2 style={{ marginBottom: "0.6rem" }}>
              Thank You! Your Order has been placed successfully
            </h2>
            <span style={{ fontWeight: "600" }}>Order Reference No. - </span>
            <span>#{order.order._id}</span>
          </div>
          <div>
            <OrderSummary orderItems={order.order.orderItems} />
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              className="orderConfirm_button"
              onClick={continueShoppingHandler}
            >
              Continue Shopping
            </button>
          </div>
        </Container>
      )}
    </>
  );
};

export default OrderSucess;
