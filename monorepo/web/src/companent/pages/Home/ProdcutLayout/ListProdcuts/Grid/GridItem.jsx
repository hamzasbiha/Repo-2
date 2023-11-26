import React, { useState } from "react";
import "./Griditem.scss";
import { AddShoppingCart, Search, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addtocart,
  removeItemFromCart,
  updateCartItemQuantity,
} from "../../../../../../redux/cartSlice";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
const GridItem = ({ item }) => {
  const user = useSelector((state) => state.user.user);
  const cartClient = useSelector((state) => state.cart.cart);
  const [QTE, setQTE] = useState(1);
  const disptach = useDispatch();
  const getItemQuantityInCart = (itemId) => {
    const itemInCart = cartClient?.find((item) => item.id === itemId);
    return itemInCart ? itemInCart.QTE : 0;
  };
  const handleDecreaseQuantity = (item) => {
    if (item.QTE > 1) {
      disptach(
        updateCartItemQuantity({
          id: item.id,
          QTE: item.QTE - 1,
        })
      );
    }
  };

  const handleIncreaseQuantity = (item) => {
    const currentQuantity = getItemQuantityInCart(item.id);
    if (currentQuantity < item.stock) {
      disptach(
        updateCartItemQuantity({
          id: item.id,
          QTE: currentQuantity + 1,
        })
      );
    } else {
      alert("Stock is limited for this item");
    }
  };

  return (
    <div className="item-list">
      <div className="btn-item">
        <div
          className="item-butn"
          onClick={() => disptach(addtocart({ ...item, QTE: QTE }))}
        >
          <AddShoppingCart />
        </div>
        <div className="item-butn">
          <Link className="link" to={`/produit/${item.id}`}>
            <Search />
          </Link>
        </div>
      </div>
      <div className="top-item">
        <div className="image">
          <img src={item.images[0]} />
        </div>
        <h1>{item.title || <Skeleton />}</h1>
        <p>{item.typefood || <Skeleton />} </p>
      </div>
      <div className="price-item">
        {user.accountType === "Personal" ? (
          <span>{item.priceForPersonal}TND </span>
        ) : user.accountType === "Society" ? (
          <span>{item.priceForSociety}TND </span>
        ) : (
          <span>{item.priceForPersonal}TND</span>
        )}
      </div>
      {getItemQuantityInCart(item.id) > 0 && (
        <div className="item-added">
          <div className="item-incresse">
            <button onClick={() => handleDecreaseQuantity(item)}>-</button>
            <span>{getItemQuantityInCart(item.id)}</span>
            <button onClick={() => handleIncreaseQuantity(item)}>+</button>
          </div>
          <div
            className="delet-item"
            onClick={async () => disptach(removeItemFromCart(item.id, item))}
          >
            <Delete />
          </div>
        </div>
      )}
    </div>
  );
};

export default GridItem;
