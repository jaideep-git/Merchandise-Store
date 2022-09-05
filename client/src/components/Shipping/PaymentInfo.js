import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { AiFillCreditCard } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { BiKey } from "react-icons/bi";
import axios from "axios";
import { createOrder } from "../../store/actions/orderAction";
import { clearCart } from "../../store/actions/cartAction";
import ClipLoader from "react-spinners/ClipLoader";
import { BiInfoCircle } from "react-icons/bi";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Button from "@mui/material/Button";

const PaymentInfo = () => {
  const [fetching, setFetching] = useState(false);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  let { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [paymentError, setPaymentError] = useState("");
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.cartTotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.orderTotal,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      setFetching(true);
      const { data } = await axios.post(
        "/api/v1/payment/process",
        { amount: orderInfo.orderTotal * 100 },
        config
      );
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.postalCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        setPaymentError("Something Went Wrong Please Try Again");
        setFetching(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          setFetching(false);
          dispatch(createOrder(order));
          dispatch(clearCart());
          navigate("/success");
        } else {
          setFetching(false);
        }
      }
    } catch (error) {
      setFetching(false);
    }
  };

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  return (
    <div className="shippingInfo">
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "end",
          cursor: "pointer",
        }}
      >
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <div>
            <HtmlTooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleTooltipClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={
                <React.Fragment>
                  <h4>Test Payment Info</h4>
                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "3px",
                      marginTop: "3px",
                    }}
                  >
                    <li>Card Number- 4242 4242 4242 4242</li>
                    <li>Expriry-04/24</li>
                    <li>CVC-424</li>
                  </ul>
                </React.Fragment>
              }
            >
              <button onClick={handleTooltipOpen} style={{color:"black",background:"transparent",border:"none"}}><BiInfoCircle fontSize="1.4rem"/></button>
            </HtmlTooltip>
          </div>
        </ClickAwayListener>
      </div>

      <p style={{ color: "red", textAlign: "center", marginBottom: "11px" }}>
        {paymentError}
      </p>
      <form action="" className="payment_form" onSubmit={submitHandler}>
        <div
          style={{
            display: "flex",
            gap: "10px",
            paddingLeft: "7px",
            border: "1px solid rgb(222, 218, 218)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <AiFillCreditCard />
          </div>
          <CardNumberElement className="paymentInput" />
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            paddingLeft: "7px",
            border: "1px solid rgb(222, 218, 218)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <BsCalendarDate />
          </div>
          <CardExpiryElement className="paymentInput" />
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            paddingLeft: "7px",
            border: "1px solid rgb(222, 218, 218)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <BiKey />
          </div>
          <CardCvcElement className="paymentInput" />
        </div>
        {fetching ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "15px",
              }}
            >
              <ClipLoader loading={true} />
            </div>
          </>
        ) : (
          <>
            <div className="shippingInfo_button">
              <input
                type="submit"
                value={`Pay $${orderInfo.orderTotal}`}
                className="cart_button"
              />
            </div>
            <Link to="/cart" className="breadCrumb_linkActive">
              Return To Cart
            </Link>
          </>
        )}
      </form>
    </div>
  );
};

export default PaymentInfo;
