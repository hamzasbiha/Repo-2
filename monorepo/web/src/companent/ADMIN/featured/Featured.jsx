import React from "react";
import * as icon from "@mui/icons-material";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./featured.scss";

const Featured = () => {
  return (
    <div className="featured-chart">
      <div className="top-fet">
        <div className="title">Sell's today</div>
        <icon.MoreVert fontSize="small" />
      </div>
      <div className="bottom-fet">
        <div className="feature-chart">
          <CircularProgressbar value={70} text="70%" strokeWidth={5} />
        </div>
        <div className="bottom-title">total sell's today</div>
        <div className="amount">200 TND</div>
      </div>
      <div className="summary">
        <div className="item">
          <div className="item-title">Target</div>
          <div className="itemResult negative">
            <icon.KeyboardArrowDown fontSize="small" />
            <div className="itemResult">$12.4k</div>
          </div>
        </div>
        <div className="item">
          <div className="item-title">Target</div>
          <div className="itemResult positive">
            <icon.KeyboardArrowUp fontSize="small" />
            <div className="itemResult">$12.4k</div>
          </div>
        </div>
        <div className="item">
          <div className="item-title">Target</div>
          <div className="itemResult positive">
            <icon.KeyboardArrowUp fontSize="small" />
            <div className="itemResult">$12.4k</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
