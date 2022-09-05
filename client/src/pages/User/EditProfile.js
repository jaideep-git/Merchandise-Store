import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import {
  updateProfile,
  updatePassword,
} from "../../store/actions/userAction";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  let { error,isUpdated, message } = useSelector(
    (state) => state.profile
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState();
  const [err, setErr] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // * Structring user data and passwords
  const userData = { name, email };
  const passwords = { oldPassword, newPassword, confirmPassword };

  // * On Profile Edit
  const editProfileHandler = (e) => {
    e.preventDefault();
    setProfile(true);
    dispatch(updateProfile(userData));
  };

  // * On Password Change
  const changePasswordHandler = (e) => {
    e.preventDefault();
    setProfile(false);
    dispatch(updatePassword(passwords));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }

    if (error) {
      setErr(error);
    }

  }, [error]);

  return (
    <Container maxWidth="lg" className="editProfile">
      <form className="editForm" onSubmit={editProfileHandler}>
        <p className={error ? "red" : "green"}>
          {profile ? err || message : ""}
        </p>
        <h2>Edit Your Profile</h2>
        <TextField
          style={{ width: "100%" }}
          id="outlined-multiline-flexible"
          label="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          InputProps={{
            type: "text",
          }}
        />
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
        <input type="submit" value="Submit" className="editBtn" />
      </form>
      <form className="editForm" onSubmit={changePasswordHandler}>
        <p className={isUpdated ? "red" : "green"}>
          {!profile ? err || message : ""}{" "}
        </p>
        <h2>Change Password</h2>
        <TextField
          style={{ width: "100%" }}
          id="outlined-multiline-flexible"
          label="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          InputProps={{
            type: "password",
          }}
        />
        <TextField
          style={{ width: "100%" }}
          id="outlined-multiline-flexible"
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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
            type: "text",
          }}
        />
        <input type="submit" value="Change Password" className="editBtn" />
      </form>
    </Container>
  );
};

export default EditProfile;
