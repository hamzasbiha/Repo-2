import React from "react";
import "./PA.scss";
import Widget from "../Widget/Widget";
import * as icon from "@mui/icons-material";
import Charts from "../chart/Charts";
import Featured from "../featured/Featured";
import Table from "../table/TableList";
import { useSelector } from "react-redux";
const ProfileAdmin = () => {
  const prod = useSelector((state) => state.product.Product);
  const order = useSelector((state) => state.cart.orders);
  return (
    <div className="PA">
      <div className="profile-container">
        <div className="icon-notif">
          <icon.Notifications className="Icon" />
          <span>{order.length}</span>
          {/* <div className="list-orders">
            <div className="map-oreder">
              {order.map((item) => {
                <div className="item-order">
                  {item.items.map((itemper) => {
                    return (
                      <div className="image">
                        {console.log(itemper)}
                        <img alt="" src={itemper.mainimg} />
                      </div>
                    );
                  })}
                </div>;
              })}
            </div>
          </div> */}
        </div>
        <div className="widgets">
          <Widget type="user" />
          <Widget type="orders" />
          <Widget type="balance" />
          <Widget type="products" />
        </div>
        <div className="charts">
          <Featured />
          <Charts />
        </div>
        <div className="list-container">
          <div className="list-title">latest Transction</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default ProfileAdmin;
