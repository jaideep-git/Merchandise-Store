import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveShippingInfo } from "../../store/actions/cartAction";
import validation from "../../hooks/Validation";

const ShippingInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    country: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // * Checks totall Errors
  useEffect(() => {
    if (errors.totalErrors === 0) {
      dispatch(saveShippingInfo(values));
      navigate("/payment");
    }
  }, [errors]);

  const shippingInfoHandler = (e) => {
    e.preventDefault();
    setErrors(validation(values));
  };

  return (
    <div className="shippingInfo_section">
      <div className="shippingInfo">
        <h2>Contact Information</h2>
        <form className="shippingForm" onSubmit={shippingInfoHandler}>
          <div>
            <TextField
              style={{ width: "100%" }}
              id="outlined-multiline-flexible"
              label="Email"
              onChange={handleChange}
              InputProps={{
                type: "email",
                name: "email",
              }}
            />
            <p style={{ color: "red", marginTop: "7.5px" }}>{errors.email}</p>
          </div>
          <h2>Shipping Address</h2>

          <div className="addressFields">
            <div>
              <TextField
                style={{ width: "100%" }}
                id="outlined-multiline-flexible"
                label="Fist Name"
                onChange={handleChange}
                InputProps={{
                  type: "text",
                  name: "firstName",
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
                onChange={handleChange}
                InputProps={{
                  type: "text",
                  name: "lastName",
                }}
              />
              <p style={{ color: "red", marginTop: "7.5px" }}>
                {errors.lastName}
              </p>
            </div>
          </div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              
            >
              <MenuItem value={}>Canada</MenuItem>
              <MenuItem value={20}>USA</MenuItem>
            </Select>
          </FormControl>
          <div>
            <TextField
              style={{ width: "100%" }}
              id="outlined-multiline-flexible"
              label="Address"
              onChange={handleChange}
              InputProps={{
                type: "text",
                name: "address",
              }}
            />
            <p style={{ color: "red", marginTop: "7.5px" }}>{errors.address}</p>
          </div>
          <div className="addressFields">
            <div>
              <TextField
                style={{ width: "100%" }}
                id="outlined-multiline-flexible"
                label="State"
                onChange={handleChange}
                InputProps={{
                  type: "text",
                  name: "state",
                }}
              />
              <p style={{ color: "red", marginTop: "7.5px" }}>{errors.state}</p>
            </div>
            <div>
              <TextField
                style={{ width: "100%" }}
                id="outlined-multiline-flexible"
                label="City"
                onChange={handleChange}
                InputProps={{
                  type: "text",
                  name: "city",
                }}
              />
              <p style={{ color: "red", marginTop: "7.5px" }}>{errors.city}</p>
            </div>
            <div>
              <TextField
                style={{ width: "100%" }}
                id="outlined-multiline-flexible"
                label="Postal Code"
                onChange={handleChange}
                InputProps={{
                  type: "text",
                  name: "postalCode",
                }}
              />
              <p style={{ color: "red", marginTop: "7.5px" }}>
                {errors.postalCode}
              </p>
            </div>
          </div>
          <div>
            <TextField
              style={{ width: "100%" }}
              id="outlined-multiline-flexible"
              label="Phone"
              onChange={handleChange}
              InputProps={{
                type: "text",
                name: "phone",
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
        </form>
      </div>
      <div className="line"></div>
    </div>
  );
};

export default ShippingInfo;
