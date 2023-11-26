import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "./NewCard.scss";
import { Link } from "react-router-dom";
const NewCard = ({ item }) => {
  return (
    <div className="card">
    <Link to={`produit/${item.id}`} className="link">
      <div className="item-top">
        <div className="image">
          {<img src={item.images[0]} alt="" loading="lazy" /> || <Skeleton />}
        </div>
      </div>
      <div className="content">
        <div className="card-title">
          {item.title.slice(0, 15) || <Skeleton />}....
        </div>
        <div className="card-price">
          <div className="price-start">
            <h3>{item.priceForPersonal || <Skeleton />}.00 TND</h3>
          </div>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default NewCard;
