import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../../store/actions/orderAction";
import OrderSummary from "../../components/Shipping/OrderSummary";
import OrderDetailInfo from "../../components/Shipping/OrderDetailInfo";
import Loading from "../../components/layout/Loader/Loading";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  let orderPaidAt;
  let orderDate;
  let orderMonth;

  let { order, fetching } = useSelector((state) => state.orderDetails);

  if (!fetching) {
    orderPaidAt = order.paidAt.split("T")[0];
    orderDate = orderPaidAt.split("-");
    orderMonth = orderDate[1].split("0");
  }

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

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  return (
    <>
      {fetching ? (
        <Loading />
      ) : (
        <Container maxWidth="md" style={{ marginTop: "2rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>Order Details</h2>
          <div className="orderInfo_div">
            <div
              style={{
                marginBottom: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div>
                <span style={{ fontWeight: "600", fontSize: "1.1rrem" }}>
                  Order -
                </span>
                <span> #{order._id}</span>
              </div>
              <div>
                <span style={{ fontWeight: "600", fontSize: "1.1rrem" }}>
                  Placed On -
                </span>
                <span>
                  {" "}
                  {orderDate[2]} {months[orderMonth[1]]} {orderDate[0]}
                </span>
              </div>
              <div>
                <span style={{ fontWeight: "600", fontSize: "1.1rrem" }}>
                  Status -
                </span>
                <span> {order.orderStatus}</span>
              </div>
            </div>
          </div>
          <div className="orderInfo_div" style={{ marginTop: "1.5rem" }}>
            <div>
              <h3 style={{ marginBottom: "1.5rem" }}>Shipping Information</h3>
              <OrderDetailInfo shippingInfo={order.shippingInfo} />
            </div>
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <OrderSummary orderItems={order.orderItems} />
          </div>
        </Container>
      )}
    </>
  );
};

export default OrderDetails;
