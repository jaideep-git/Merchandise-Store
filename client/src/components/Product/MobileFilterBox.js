import React, { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import "./ProductStyles.css";

const MobileFilterBox = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="filterSection_mob">
      <div className="filter_label">
        <p onClick={() => setOpen(!open)}>Filter</p>
        <MdArrowDropDown />
      </div>
      <div className="filter_content">
        {open ? props.children : ""}
      </div>
    </div>
  );
};

export default MobileFilterBox;
