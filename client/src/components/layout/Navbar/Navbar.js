import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../../assets/logo.png";
import { BiSearch } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineShopping } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";

const Navbar = () => {
  const [open, setOpen] = useState(false);

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
            onClick={() => setOpen(!open)}
          />
          <AiOutlineUser color="white" fontSize="1.6em" />
          <AiOutlineShopping color="white" fontSize="1.6em" />
        </div>
      </nav>
      <div className={`search_box ${open ? "visible" : ""}`}>
        <div className="search_inner">
          <div className="searchBar">
            <form action="" className="search_form">
              <BiSearch color="grey" fontSize="1.6em" />
              <input type="text" placeholder="Search..." className="search" />
            </form>
            <MdOutlineClose fontSize="1.6em" onClick={() => setOpen(!open)} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
