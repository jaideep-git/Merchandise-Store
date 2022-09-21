import React from "react";
import "./Carousel.css";
import office from "../../assets/office_web.png";
import officeMob from "../../assets/office_mobile.png";

function Carousel() {
  const mobile = window.innerWidth <= 768;
  return (
    <div className="hero">
      <div className="hero_image">
        <img src={mobile ? officeMob : office} alt="" />
      </div>
    </div>
  );
}

export default Carousel;
