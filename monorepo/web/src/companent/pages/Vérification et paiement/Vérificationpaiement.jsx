import React, { useEffect } from "react";
import "./Vérificationpaiement.scss";
import * as Icon from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartApi,
  fetchSingleCart,
  removeItemFromCart,
  restCart,
} from "../../../redux/cartSlice";
import { Link } from "react-router-dom";
const Vérificationpaiement = ({
  currentStep,
  setCurrentStep,
  filed,
  oldclient,
}) => {
  const items = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);
  const carrt = useSelector((state) => state.cart.currentUserCart);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("access");
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (user.accountType === "Personal") {
      items.forEach((item) => {
        totalPrice += item.priceForPersonal * item.QTE;
      });
    } else {
      items.forEach((item) => {
        totalPrice += item.priceForCompany * item.QTE;
      });
    }

    return totalPrice;
  };
  useEffect(() => {
    dispatch(fetchSingleCart({ id: user.id, token: token }));
  }, []);
  const userinf = filed.userInformation;
  const totalPrice = calculateTotalPrice();
  const handleAddCart = () => {
    if (Object.entries(oldclient).length !== 0) {
      const orderItems = items.map((item) => ({
        productId: item.id,
        quantity_per_item: item.QTE,
      }));
      const info = {
        ...oldclient,
        order_Items: orderItems,
        totalPrice: totalPrice,
      };
      dispatch(addCartApi({ info: info, token: token }))
        .then((action) => {
          if (action.type === "cart/fulfilled") {
            setCurrentStep(3);
            dispatch(restCart());
            console.log("failed");
          }
        })
        .catch((error) => {
          alert("Something went wrong: " + error.message);
        });
    } else {
      if (Object.entries(filed).length !== 0) {
        const orderItems = items.map((item) => ({
          productId: item.id,
          quantity_per_item: item.QTE,
        }));
        const info = {
          ...userinf,
          order_Items: orderItems,
          totalPrice: totalPrice,
        };
        dispatch(
          addCartApi({
            info: info,
            token: token,
          })
        );
        setCurrentStep(3);
        dispatch(restCart());
      }
    }
  };

  return (
    <div className="Vérification">
      <div className="top-section-verify">
        <div className="card-info-box">
          <div className="title-box">
            <h1>Your Delivery Address</h1>
            <div className="list-info">
              <div className="item-info-list">
                <b>
                  {carrt &&  carrt.order_Items !== 0
                    ? oldclient.User.fullname
                    : filed.userInformation.fullname}
                </b>
              </div>
              <div className="item-info-list">
                <b>
                  {carrt && carrt.order_Items !== 0
                    ? oldclient.User.email
                    : filed.userInformation.email}
                </b>
              </div>
              <div className="item-info-list">
                <b>
                  {carrt && carrt.order_Items !== 0
                    ? oldclient.adresse
                    : filed.userInformation.adresse}
                </b>
              </div>
              <div className="item-info-list">
                <b>
                  {carrt && carrt.order_Items !== 0
                    ? oldclient.codepos
                    : filed.userInformation.codepos}
                  ,
                </b>
                <b>
                  {carrt && carrt.order_Items !== 0
                    ? oldclient.ville
                    : filed.userInformation.ville}
                </b>
              </div>
              <div className="item-info-pos">
                <b>
                  {carrt && carrt.order_Items !== 0
                    ? oldclient.phone
                    : filed.userInformation.phone}
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-list-item">
        <div className="list-info">
          {items?.map((item) => {
            return (
              <div key={item.id}>
                <div className="list-col-orders">
                  <div className="left-section">
                    <img alt="" src={item.images[0]} />
                    <h1>{item.title} </h1>
                  </div>
                  <div className="right-section">
                    <span>
                      <b>Price </b>
                      {item.priceForPersonal}TND
                    </span>
                    <span>
                      <b>QTE </b>
                      {item.QTE}
                    </span>
                  </div>
                  <div
                    className="btn-delete-item"
                    onClick={() => dispatch(removeItemFromCart(item.id, item))}
                  >
                    <Icon.Delete className="icon" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bottom-section">
        <div className="title-price-total">
          <h1>Total TTC</h1>
        </div>
        <h1 className="total price for commande">
          {calculateTotalPrice().toFixed(2)} TND
        </h1>
      </div>
      <div className="btn-section-bottom">
        <div className="shoping-btn">
          <Icon.KeyboardArrowLeft />
          <span className="shoping-btn">
            <Link className="link" to={"/"}>
              Continue Shopping
            </Link>
          </span>
        </div>
        <div className="command-btn">
          <button
            onClick={() => {
              handleAddCart();
            }}
          >
            Make your Order
          </button>

          <Icon.KeyboardArrowRight />
        </div>
      </div>
    </div>
  );
};

export default Vérificationpaiement;
