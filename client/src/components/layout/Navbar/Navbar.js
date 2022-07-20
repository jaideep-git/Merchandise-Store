import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../../assets/logo.png";
import { BiSearch } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineShopping } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";

const Navbar = () => {
  let navigate = useNavigate();
  const inputRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const searchHandler = () => {
    if (searchKeyword) {
      navigate(`products/${searchKeyword}`);
    }
  };

  if (open) {
    setTimeout(() => {
      inputRef.current.focus();
      console.log("hi")
    },500)
 }
  return (
    <header>
      <nav>
        <div className="logo">
          <img src={logo} alt="" />
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
          <AiOutlineUser color="white" fontSize="1.6em" />
          <AiOutlineShopping color="white" fontSize="1.6em" />
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
                onChange={(e) => setSearchKeyword(e.target.value) }
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
