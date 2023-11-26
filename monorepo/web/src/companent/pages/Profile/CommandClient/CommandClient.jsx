import React, { useState } from "react";
import { useSelector } from "react-redux";
import Commande from "./command/Commande";
import { Link, Outlet } from "react-router-dom";
import "./CommandClient.scss";

const CommandClient = () => {
  const cart = useSelector((state) => state.cart.currentUserCart);
  return (
    <div className="cmd">
        <h1>Your Cart</h1>
      <div className="command">
      </div>
      <Outlet />
    </div>
  );
};

export default CommandClient;
