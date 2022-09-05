import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../store/actions/cartAction";
import { State, City } from "country-state-city";
import validation from "../../hooks/Validation";
import { BiCodeBlock } from "react-icons/bi";

const ShippingInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState({});

  // * Checks totall Errors
  useEffect(() => {
    if (errors.totalErrors === 0) {
      dispatch(
        saveShippingInfo({
          firstName,
          lastName,
          email,
          phone,
          address,
          postalCode,
          country,
          state,
          city,
        })
      );
      navigate("/confirm");
    }

    if(shippingInfo){
      setFirstName(shippingInfo.firstName);
      setLastName(shippingInfo.lastName);
      setEmail(shippingInfo.email);
      setPhone(shippingInfo.phone);
      setAddress(shippingInfo.address);
      setPostalCode(shippingInfo.postalCode);
      setCountry(shippingInfo.country);
      setState(shippingInfo.state)
      setCity(shippingInfo.city)
    }
  }, [errors]);

  const shippingInfoHandler = (e) => {
    e.preventDefault();
    setErrors(
      validation({
        firstName,
        lastName,
        email,
        phone,
        address,
        postalCode,
        country,
        state,
        city,
      })
    );
  };

  const testShippingInfo = () => {
    setFirstName("Test");
    setLastName("User");
    setEmail("testuser@gmail.com");
    setPhone("1234567890");
    setAddress("1234 Street Name");
    setPostalCode("A1A 1A1");
    setCountry("CA");
    setCity("Brampton");
    setState("ON")
  };

  return (
    <div className="shippingInfo_section">
      <div className="shippingInfo">
        <h2 style={{ marginBottom: "1.5rem" }}>Contact Information</h2>
        <form className="shippingForm" onSubmit={shippingInfoHandler}>
          <div>
            <TextField
              style={{ width: "100%" }}
              id="outlined-multiline-flexible"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                type: "email",
              }}
            />
            <p style={{ color: "red", marginTop: "7.5px" }}>{errors.email}</p>
          </div>
          <h2>Shipping Address</h2>

          <div
            style={{
              display: "flex",
              gap: "10px",
              cursor: "pointer",
            }}
            onClick={testShippingInfo}
          >
            <p style={{ textDecoration: "underline" }}>Test shippingInfo</p>
            <BiCodeBlock />
          </div>

          <div className="addressFields">
            <div>
              <TextField
                style={{ width: "100%" }}
                id="outlined-multiline-flexible"
                label="First Name"
                value={firstName}
                defaultValue={shippingInfo.firstName}
                onChange={(e) => setFirstName(e.target.value)}
                InputProps={{
                  type: "text",
                }}
              />
              <p style={{ color: "red", marginTop: "7.5px" }}>
                {errors.firstName}
              </p>
            </div>
            <div>
              <TextField
                style={{ width: "100%" }}
                id="outlined-multiline-flexible"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                InputProps={{
                  type: "text",
                }}
              />
              <p style={{ color: "red", marginTop: "7.5px" }}>
                {errors.lastName}
              </p>
            </div>
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <MenuItem value={"CA"}>Canada</MenuItem>
                <MenuItem value={"US"}>USA</MenuItem>
              </Select>
            </FormControl>
            <p style={{ color: "red", marginTop: "7.5px" }}>{errors.country}</p>
          </div>
          <div>
            <TextField
              style={{ width: "100%" }}
              id="outlined-multiline-flexible"
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              InputProps={{
                type: "text",
              }}
            />
            <p style={{ color: "red", marginTop: "7.5px" }}>{errors.address}</p>
          </div>
          <div className="addressFields">
            <div style={{ width: "60%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <MenuItem key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <p style={{ color: "red", marginTop: "7.5px" }}>{errors.state}</p>
            </div>
            <div style={{ width: "60%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  {City &&
                    City.getCitiesOfState(country, state).map((item, index) => (
                      <MenuItem key={index} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <p style={{ color: "red", marginTop: "7.5px" }}>{errors.city}</p>
            </div>
          </div>
          <div>
            <TextField
              style={{ width: "100%" }}
              id="outlined-multiline-flexible"
              label="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              InputProps={{
                type: "text",
              }}
            />
            <p style={{ color: "red", marginTop: "7.5px" }}>
              {errors.postalCode}
            </p>
          </div>
          <div>
            <TextField
              style={{ width: "100%" }}
              id="outlined-multiline-flexible"
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              InputProps={{
                type: "text",
              }}
            />
            <p style={{ color: "red", marginTop: "7.5px" }}>{errors.phone}</p>
          </div>
          <div className="shippingInfo_button">
            <input
              type="submit"
              value="Proceed To Payment"
              className="cart_button"
            />
          </div>
          <Link to="/cart" className="breadCrumb_linkActive">
            Return To Cart
          </Link>
        </form>
      </div>
      <div className="line"></div>
    </div>
  );
};

export default ShippingInfo;
