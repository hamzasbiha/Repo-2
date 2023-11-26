import React, { useState } from "react";
import "./checkout.scss";
import * as Icon from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addCartApi } from "../../../redux/cartSlice";
import { Link } from "react-router-dom";
import FeaturedProducts from "../../companent/featuredProuducts/FeaturedProducts";
const CheckoutForm = ({
  filed,
  setFiled,
  oldclient,
  setCurrentStep,
  currentStep,
}) => {
  const [phoneNeeds, setPHoneNeeds] = useState(false);
  const [Showlist, setShowList] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cartitems = useSelector((state) => state.cart.cart);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userInformation = Object.fromEntries(formData);

    setFiled({ userInformation });
    setCurrentStep(2);
  };
  console.log(cartitems);
  return (
    <div>
      <div className="content">
        <div className="left">
          <div>
            <h1>Information For Your Order </h1>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="input-item-2">
                <div className="item">
                  <label>FullName</label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    defaultValue={user.fullname}
                    required
                  />
                </div>
              </div>
              <div className="input-item-2">
                <div className="item">
                  <label>Email</label>
                  <input
                    type="text"
                    id="email"
                    defaultValue={user.email}
                    name="email"
                    required
                  />
                </div>
              </div>
              <div className="input-item-2">
                <div className="item">
                  <label>Société</label>
                  <input type="text" id="Société" name="Société" />
                </div>
              </div>
              <div className="input-item-2">
                <div className="item">
                  <label>Adresse </label>
                  <input
                    type="text"
                    id="adresse"
                    name="adresse"
                    required
                    defaultValue={oldclient.adresse}
                  />
                </div>
              </div>
              <div className="input-item-2">
                <div className="item">
                  <label>Ville</label>
                  <input
                    type="text"
                    id="ville"
                    name="ville"
                    required
                    defaultValue={oldclient.ville}
                  />
                </div>
              </div>
              <div className="input-item-2">
                <div className="item">
                  <label>Code postal</label>
                  <input
                    type="text"
                    id="codepos"
                    name="codepos"
                    required
                    defaultValue={oldclient.codepos}
                  />
                </div>
              </div>
              <div className="input-item-2">
                <div className="item">
                  <label>Numéro de téléphone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    required
                    defaultValue={oldclient.phone}
                  />
                </div>
                <div
                  className="question"
                  onMouseEnter={() => {
                    setPHoneNeeds(true);
                  }}
                  onMouseLeave={() => {
                    setPHoneNeeds(false);
                  }}
                >
                  <Icon.QuestionMark />
                  {phoneNeeds && (
                    <div className="hover-info">
                      Pour les questions de livraison.
                    </div>
                  )}
                </div>
              </div>
              <div className="button-form">
                <Link to={"/"} className="link">
                  Annuler
                </Link>
                <button type="submit">Continuer</button>
                <Icon.KeyboardArrowRight />
              </div>
            </form>
          </div>
        </div>
        <div className="right">
          <div className="information">
            <div className="card-info-order">
              <div className="title-cart-order">
                <h1>YOU CART</h1>
              </div>
              <div className="under-title">
                <b>Product in you cart:</b>
                <span>{cartitems.length}</span>
              </div>
              <b>
                <p>Products</p>
              </b>
              <div className="list-info">
                {cartitems?.map((item) => {
                  return (
                    <div key={item.id}>
                      <div className="list-col-orders">
                        <div className="image">
                          <img src={item.images[0]} alt="" />
                        </div>
                        <div className="title-list">
                          <p>{item.title} </p>
                          <div className="QTe-price">
                            <div>
                              <b>Price :</b>
                            </div>
                            <b>
                              {item.priceForCompany}TND{" "}
                            </b>
                            <b>QTE :</b>
                            <p>{item.QTE} </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="card-bottom">
                <div className="card-icon">
                  <div>
                    <div className="info-card-payment">
                      <div className="shipp">
                        <Icon.LocalShipping fontSize="large" />
                        <b>PAIEMENT:</b>
                        <p>Cash on Delivery</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-icon">
                  <div>
                    <div className="info-card-payment">
                      <div className="shipp">
                        <Icon.AccessTime fontSize="large" />
                        <b>PAIEMENT:</b>
                        <p>Averge 3 Day</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-icon">
                  <div>
                    <div className="info-card-payment">
                      <div className="shipp">
                        <Icon.RestartAlt fontSize="large" />
                        <b>Return Policy:</b>
                        <p>Averge 3 Day</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <FeaturedProducts />
      </div>
    </div>
  );
};

export default CheckoutForm;
