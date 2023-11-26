import React from "react";
import * as icon from "@mui/icons-material";
import { useSelector } from "react-redux";
import "./widget.scss";
const Widget = ({ type }) => {
  const prod = useSelector((state) => state.product.Product);
  const order = useSelector((state) => state.cart.orders);
  const client = useSelector((state) => state.admin.clients);
  let data;
  switch (type) {
    case "user":
      data = {
        title: "users",
        isMoney: false,
        user: client.length,
        cart: 10,
        link: "see all users",
        icon: (
          <icon.Person
            className="icon"
            style={{
              color: "#f8f9fa",
              backgroundColor: "#457b9d",
            }}
          />
        ),
      };
      break;
    case "orders":
      data = {
        title: "orders",
        totalOrders: order.length,
        isMoney: false,
        link: "see all orders",
        icon: (
          <icon.ShoppingCart
            className="icon"
            style={{
              color: "#f8f9fa",
              backgroundColor: "#ee9b00",
            }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "balance",
        isMoney: false,
        link: "see details",
        icon: (
          <icon.Balance
            className="icon"
            style={{
              color: "#f8f9fa",
              backgroundColor: "#a7c957",
            }}
          />
        ),
      };
      break;
    case "products":
      data = {
        title: "PRODUCTS",
        totalproducts: prod.length,
        isMoney: false,
        link: "see all products",
        icon: (
          <icon.ProductionQuantityLimits
            className="icon"
            style={{
              color: "#f8f9fa",
              backgroundColor: "#d4a373",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left-widget">
        <div className="title">{data.title}</div>
        <div className="email">{data.user}</div>
        {data.cart ? (
          <div className="cart-item-user">User Cart({data.cart})</div>
        ) : null}
        {data.totalproducts ? (
          <div className="cart-item-user">
            Products posted ({data.totalproducts})
          </div>
        ) : null}
        {data.totalOrders ? (
          <div className="cart-item-user">Orders ({data.totalOrders})</div>
        ) : null}
        <div className="link-widget">{data.link} </div>
      </div>
      <div className="right-widget">
        <div className="percantage positive">
          <icon.KeyboardArrowUp />
          <span>20%</span>
        </div>
        <div className="percantage">{data.icon}</div>
      </div>
    </div>
  );
};

export default Widget;
