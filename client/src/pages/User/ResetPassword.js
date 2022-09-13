import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../store/actions/userAction";
import { useParams,Link } from "react-router-dom";
import Loading from "../../components/layout/Loader/Loading";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { token } = useParams();

  const { error, success, fetching } = useSelector(
    (state) => state.forgotPassword
  );
  let message;

  if (success) {
    message = "Password Changed Successfully";
  }
  const passwords = { password: password, confirmPassword: confirmPassword };
  const forgotPasswordHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(token, passwords));
  };
  return (
    <>
      {fetching ? (
        <Loading />
      ) : (
        <div className="LoginSignUpContainer">
          <div className="LoginSignUpBox password_padding">
            {success ? (
              <>
                <p className="password_message green">{message}</p>
                <Link to="/login"><p className="password_login">Go To Login</p></Link>
              </>
            ) : (
              <>
                <h2 className="loginHeading">Reset Password</h2>
                <form onSubmit={forgotPasswordHandler}>
                  <div className="recoveryEmail">
                    <p className="password_message red">{error}</p>
                    <TextField
                      style={{ width: "100%" }}
                      id="outlined-multiline-flexible"
                      label="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        type: "password",
                      }}
                    />
                    <TextField
                      style={{ width: "100%" }}
                      id="outlined-multiline-flexible"
                      label="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      InputProps={{
                        type: "Password",
                      }}
                    />
                    <input type="submit" value="Submit" className="loginBtn" />
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
