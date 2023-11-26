import React, { useState } from "react";
import "./List.scss";
import img1 from "../../../assets/banner/ban2.jpg";

const List = () => {
  const data = [
    {
      id: 1,
      title: "Chien",
      img: img1,
      isNew: true,
      oldPrice: "20dt",
      newPrice: "18dt",
    },
    {
      id: 2,
      title: "Chien",
      img: img1,
      isNew: true,
      oldPrice: "20dt",
      newPrice: "18dt",
    },
    {
      id: 3,
      title: "Chien",
      img: img1,
      isNew: true,
      oldPrice: "20dt",
      newPrice: "18dt",
    },
    {
      id: 4,
      title: "Chien",
      img: img1,
      isNew: true,
      oldPrice: "20dt",
      newPrice: "18dt",
    },
    {
      id: 5,
      title: "Chien",
      img: img1,
      isNew: true,
      oldPrice: "20dt",
      newPrice: "18dt",
    },
    {
      id: 6,
      title: "Chien",
      img: img1,
      isNew: true,
      oldPrice: "20dt",
      newPrice: "18dt",
    },
    {
      id: 7,
      title: "Chien",
      img: img1,
      isNew: true,
      oldPrice: "20dt",
      newPrice: "18dt",
    },
    {
      id: 8,
      title: "Chien",
      img: img1,
      isNew: true,
      oldPrice: "20dt",
      newPrice: "18dt",
    },
  ];
  return (
    <div className="list">
      {data?.map((item) => {
        return (
          <div className="list-item" key={item.id}>
            {/* <img alt="" src={item.img} /> */}
            <h3>{item.title} </h3>
            <p>{item.oldPrice} </p>
            <p>{item.newPrice} </p>
          </div>
        );
      })}
    </div>
  );
};

export default List;
