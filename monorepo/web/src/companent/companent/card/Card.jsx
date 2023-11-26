import React from "react";
import "./Card.scss";
const Card = ({ item, transletTo }) => {
  return (
    <div
      className="Card"
      style={{ transform: `translateX(${transletTo + 0}vw)` }}
    >
      <div className="card-item">
        <div className="main-container">
          <div className="container">
            <img src={item.image} />
          </div>
        </div>
        <div className="second-container">
          <h1>{item.title} </h1>
        </div>
      </div>
    </div>
  );
};

export default Card;
