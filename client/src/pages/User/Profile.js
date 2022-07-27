import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeStatus, getUserDetails } from "../../store/actions/userAction";
import Loading from "../../components/layout/Loader/Loading";

const Profile = () => {
  const dispatch = useDispatch();

  const { error, fetching, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  let nameCap;
  let { isUpdated } = useSelector((state) => state.profile);

  useEffect(() => {
    if (isUpdated) {
      dispatch(getUserDetails());
      dispatch(changeStatus());
    }
  }, []);

  if (isAuthenticated) {
    nameCap = user.name.toUpperCase();
  }

  return (
    <>
      {fetching ? (
        <Loading />
      ) : (
        <Container maxWidth="lg" className="profile_page">
          <div className="profile_head">
            <h2>Welcome {nameCap} !</h2>
            <Link to="/profile/edit">
              <p>Edit Profile</p>
            </Link>
          </div>

          <div className="order_section">
            <h2>Your Orders</h2>
          </div>
        </Container>
      )}
    </>
  );
};

export default Profile;
