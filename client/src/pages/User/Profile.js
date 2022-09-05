import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeStatus, getUserDetails } from "../../store/actions/userAction";
import Loading from "../../components/layout/Loader/Loading";
import { clearNewOrder, myOrders } from "../../store/actions/orderAction";
import OrderList from "../../components/Shipping/OrderList";
import '../Shipping/shippingStyles.css'

const Profile = () => {
  const dispatch = useDispatch();

  const { fetching, user } = useSelector((state) => state.user);

  let { isUpdated } = useSelector((state) => state.profile);
  let { order } = useSelector((state) => state.newOrder);
  let { orders } = useSelector((state) => state.myOrders);

  function truncateString(str, num) {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num)
  }

  useEffect(() => {
    if (isUpdated) {
      dispatch(getUserDetails());
      dispatch(changeStatus());
    }
    if (order) {
      dispatch(myOrders());
      dispatch(clearNewOrder());
    }
  }, []);

  return (
    <>
      {fetching ? (
        <Loading />
      ) : (
        <Container maxWidth="lg" className="profile_page">
          <div className="profile_head">
            <h2>Welcome { user && truncateString(user.name,9) }!</h2>
            <Link to="/profile/edit">
              <p>Edit Profile</p>
            </Link>
          </div>
          {orders.length >= 1 ? (
            <>
              <div className="order_section">
                <h2>Your Orders</h2>
              </div>
              <div style={{marginTop:"1rem"}}>
                <OrderList orders={orders}/>
              </div>
            </>
          ) : (
            <>
              <div className="order_section">
                <h2>Your Orders</h2>
              </div>
              <p style={{ textAlign: "center", marginTop: "2rem", fontWeight:"550",fontSize:"1.1rem" }}>
                No Orders To Show
              </p>
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default Profile;
