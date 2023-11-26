import React from "react";
import img2 from "../../../assets/5.png";
import items from "../../../assets/manip/items.png";

import "./Banner.scss";

const Banner = () => {
  return (
    <div className="banner">
      <img alt="" src={items} />
    </div>
  );
};

export default Banner;
