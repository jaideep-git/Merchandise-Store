import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../store/actions/userAction";
import Loading from "../../components/layout/Loader/Loading";

const ForgetPassword = () => {
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const dispatch = useDispatch();

  const { error, message, fetching } = useSelector((state) => state.forgotPassword);

  const forgotPasswordHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email: recoveryEmail }));
  };
  return (
    <>
      {fetching ? (
        <Loading />
      ) : (
        <div className="LoginSignUpContainer">
          <div className="LoginSignUpBox password_padding">
            <h2 className="loginHeading">Recover Password</h2>
            <p className="passwordHeading">Please Enter Your Email</p>
            <form onSubmit={forgotPasswordHandler}>
              <div className="recoveryEmail">
                <p className={`password_message ${error ? "red" : "green"}`}>
                  {error || message}
                </p>
                <TextField
                  style={{ width: "100%" }}
                  id="outlined-multiline-flexible"
                  label="Email"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  InputProps={{
                    type: "email",
                  }}
                />
                <input type="submit" value="Submit" className="loginBtn" />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgetPassword;
