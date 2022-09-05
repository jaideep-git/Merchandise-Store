import React, { useRef, useState, useEffect } from "react";
import "./userStyle.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../store/actions/userAction";
import { AiFillEyeInvisible } from "react-icons/ai";
import { BiCodeBlock } from "react-icons/bi";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  // * Getting User State
  const { error, isAuthenticated } = useSelector((state) => state.user);

  // * Login Form Submit
  const loginSubmit = (e) => {
    e.preventDefault();
    setLoginActive(true);
    dispatch(login(loginEmail, loginPassword));
  };

  const redirect = location.search ? location.search.split("=")[1] : "profile";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${redirect}`);
    }
  }, [isAuthenticated]);

  // * Register Form Submit
  const registerSubmit = (e) => {
    e.preventDefault();
    setSignUpActive(true);
    dispatch(register(signUpName, signUpEmail, signUpPassword));
  };

  // * Tab Switch Functionality
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const [loginActive, setLoginActive] = useState(false);
  const [signUpActive, setSignUpActive] = useState(false);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
      setSignUpActive(false);
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
      setLoginActive(false);
    }
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const testUser = () => {
    setLoginEmail("testuser@gmail.com");
    setLoginPassword("testuser1234");
  };

  return (
    <div className="LoginSignUpContainer">
      <div className="LoginSignUpBox">
        <div>
          <div className="login_signUp_toggle">
            <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
            <div className="verticleLine"></div>
            <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
          </div>
          <button ref={switcherTab}></button>
        </div>
        {/* Login Form */}
        <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
          <div className="loginHeadBox">
            <h2 className="loginHeading">Login To Your Account</h2>
            <p>{loginActive ? error : ""}</p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "end",
              cursor: "pointer",
            }}
            onClick={testUser}
          >
            <p style={{ textDecoration: "underline" }}>Test user</p>
            <BiCodeBlock />
          </div>

          <div className="loginEmail">
            <TextField
              style={{ width: "100%" }}
              id="outlined-multiline-flexible"
              label="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              InputProps={{
                type: "email",
              }}
            />
          </div>
          <div className="loginPassword">
            <TextField
              style={{ width: "100%" }}
              id="outlined-multiline-flexible"
              label="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              InputProps={{
                type: "password",
              }}
            />
          </div>
          <Link to="/password/forgot">Forget Password ?</Link>
          <input type="submit" value="Login" className="loginBtn" />
        </form>
        {/* Sign Up Form */}
        <form
          className="signUpForm"
          ref={registerTab}
          onSubmit={registerSubmit}
        >
          <div className="loginHeadBox">
            <h2 className="loginHeading">Create An Account</h2>
            <p>{signUpActive ? error : ""}</p>
          </div>
          <div className="signUpName">
            <TextField
              style={{ width: "100%" }}
              id="outlined-multiline-flexible"
              label="Name"
              value={signUpName}
              onChange={(e) => setSignUpName(e.target.value)}
              InputProps={{
                type: "text",
              }}
            />
          </div>
          <div className="signUpEmail">
            <TextField
              style={{ width: "100%" }}
              id="outlined-multiline-flexible"
              label="Email"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
              InputProps={{
                type: "email",
              }}
            />
          </div>
          <div className="signUpPassword">
            <TextField
              style={{ width: "100%" }}
              id="outlined-multiline-flexible"
              label="Password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              type={passwordType}
            />
            <AiFillEyeInvisible
              fontSize="1.5rem"
              className="showPassword"
              onClick={togglePassword}
            />
          </div>
          <input type="submit" value="Register" className="signUpBtn" />
        </form>
      </div>
    </div>
  );
};

export default LoginSignUp;
