import React, { useState } from "react";
import "./Featured.scss";
import NewCard from "../newProdcuts/NewCard";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
const FeaturedProducts = () => {
  const data = useSelector((state) => state.product.Product);
  const filtreddata = [...data].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="featured">
      <div className="wrapper">
        <h1>Access to our new products and promotions. </h1>
        <div className="center">
          {filtreddata.slice(0, 5).map((item) => {
            return <NewCard item={item} key={item.id} /> || <Skeleton />;
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
