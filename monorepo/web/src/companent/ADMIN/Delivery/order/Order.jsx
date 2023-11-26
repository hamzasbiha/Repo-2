import React, { useEffect, useState } from "react";
import * as icon from "@mui/icons-material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { ArrowBackIos } from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./order.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrderClient,
  fetchSingleCart,
  updatecart,
} from "../../../../redux/cartSlice";
const Order = () => {
  const id = useParams().id;
  const navigation = useNavigate();
  const [changestatus, setChangeStatus] = useState(false);
  const [toggleUpdate, setToggle] = useState(false);
  const [Status, setStatus] = useState("");
  let totalPrice = 0;
  const token = sessionStorage.getItem("access");
  const order = useSelector((state) => state.cart.currentUserOrder);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrderClient({ id: id, token: token }));
    setToggle(false);
  }, [token, id, toggleUpdate]);
  const handleStatusOrder = (e) => {
    console.log(e.target.value);
    setStatus(e.target.value);
  };
  const handleUpdateStatus = () => {
    const updateData = { status: Status };
    dispatch(updatecart({ token: token, id: id, inputs: updateData }));
    setChangeStatus(false);
    setToggle(true)
  };
  return (
    <div className="order">
      <div className="order-container">
        <div className="top-orders">
          <div className="order-tile-top">
            <span
              onClick={() => navigation(-1)}
              style={{
                cursor: "pointer",
              }}
            >
              <ArrowBackIos />
            </span>
            <h1>Order Client</h1>
            <icon.RoomService />
          </div>
          <div className="order-tile-top">
            <button onClick={() => setChangeStatus(!changestatus)}>
              <b>Update Status</b>
            </button>
            {!changestatus ? (
              <>
                <b>Status Order : </b>
                <p>{order.status} </p>
              </>
            ) : (
              <div className="input-status">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel
                    id="demo-simple-select-standard-label"
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    // label={`${order.status}`}
                    onChange={handleStatusOrder}
                    value={Status}
                  >
                    <MenuItem value={"Pending"}>Pending</MenuItem>
                    <MenuItem value={"Deliverd"}>Deliverd</MenuItem>
                    <MenuItem value={"Refund"}>Refund</MenuItem>
                  </Select>
                </FormControl>
                <button onClick={handleUpdateStatus}>Apply</button>
              </div>
            )}
          </div>
        </div>
        <div className="order-container-item">
          {order && order.order_Items.length !== 0 ? (
            <div className="left">
              <div className="User-info">
                <div className="top-name">
                  <p>
                    <span>ID :</span> {order.User.id}
                  </p>
                  <p>
                    <span>FullName :</span> {order.User.firstname}{" "}
                    {order.User.lastname}
                  </p>
                </div>
                <div className="top-name">
                  <p>
                    <span>Email: </span>
                    {order.User.email}
                  </p>
                </div>
                <div className="top-name">
                  <p>
                    <span>Tel: </span>
                    {order.phone}
                  </p>
                </div>
                <div className="top-name">
                  <p>
                    <span>Ville: </span>
                    {order.ville}
                  </p>
                </div>
                <div className="top-name">
                  <p>
                    <span>Adresse: </span> {order.adresse}
                  </p>
                </div>
                <div className="top-name">
                  <p>
                    <span>Code postal: </span> {order.codepos}
                  </p>
                </div>
                <div className="top-name">
                  <p>
                    <span>AccountType: </span>
                    {order.User.accountType.toLowerCase()}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <span>NO Orders</span>
          )}
          <div className="rigth">
            <div className="list-orders-client">
              <div>
                <div>
                  {order && order.order_Items.length !== 0 ? (
                    <span>Total Cart : {order.order_Items.length}</span>
                  ) : (
                    <span>no orders</span>
                  )}
                  <div className="date-order">
                    <h1>Date Order:</h1>
                    <span>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="ttprice-order">
                    <h1>Total Price :</h1>
                    {order && order.totalPrice ? (
                      <b>{order.totalPrice.toFixed(2)} TND</b>
                    ) : (
                      <b>0</b>
                    )}
                  </div>
                </div>
              </div>
              {order && order.order_Items.length !== 0 ? (
                order.order_Items.map((item) => {
                  return (
                    <div className="item-orders" key={item.id}>
                      {
                        <div
                          style={{
                            display: "none",
                          }}
                        >
                          {
                            (totalPrice += parseFloat(
                              order.User.accountType !== "SOCITY"
                                ? item.priceForPersonal
                                : item.priceForCompany
                            ))
                          }
                        </div>
                      }
                      <div className="image-order">
                        <img alt="" src={item.products.images[0]} />
                      </div>
                      <div className="title">
                        <div className="item-red">
                          <span>Ref: {item.products.id} </span>
                        </div>
                        <h1> {item.products.title} </h1>
                        <p>{item.products.category} </p>
                      </div>
                      <div className="price-order">
                        {order.User.accountType !== "Society" ? (
                          <span>{item.products.priceForPersonal} TND</span>
                        ) : (
                          <span>{item.products.priceForCompany} TND</span>
                        )}
                        <p> {item.products.typefood} </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <span>somthing wrong </span>
              )}
              {order && order.totalPrice ? (
                <h1>Total Price: {totalPrice.toFixed(2)} TND</h1>
              ) : (
                <h1>0</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
