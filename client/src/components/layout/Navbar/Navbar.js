import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../../assets/logo.png";
import { BiSearch } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineShopping } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/actions/userAction";

const Navbar = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const { isAuthenticated } = useSelector((state) => state.user);

  const searchHandler = () => {
    if (searchKeyword) {
      navigate(`products/${searchKeyword}`);
    }
  };

  if (open) {
    setTimeout(() => {
      inputRef.current.focus();
    }, 500);
  }

  const userLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <Link to="/">
            {" "}
            <img src={logo} alt="" />{" "}
          </Link>
        </div>
        <div className="links">
          <BiSearch
            color="white"
            fontSize="1.6em"
            onClick={() => {
              setOpen(!open);
              inputRef.current.value = "";
            }}
          />
          <Link to="/login">
            <AiOutlineUser color="white" fontSize="1.6em" />
          </Link>
          <Link to="/cart"><AiOutlineShopping color="white" fontSize="1.6em" /></Link>
          {isAuthenticated ? (
            <FiLogOut color="white" fontSize="1.6em" onClick={userLogout} />
          ) : (
            ""
          )}
        </div>
      </nav>
      <div className={`search_box ${open ? "visible" : ""}`}>
        <div className="search_inner">
          <div className="searchBar">
            <form action="" className="search_form" onSubmit={searchHandler}>
              <BiSearch color="grey" fontSize="1.6em" />
              <input
                type="text"
                placeholder="Search..."
                className="search"
                ref={inputRef}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </form>
            <MdOutlineClose
              fontSize="1.6em"
              onClick={() => {
                setOpen(!open);
                inputRef.current.value = "";
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
