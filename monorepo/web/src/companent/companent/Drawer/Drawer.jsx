import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Close, DeleteOutline } from "@mui/icons-material";
import "./Drawer.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItemFromCart,
  restCart,
  updateCartItemQuantity,
} from "../../../redux/cartSlice";
import { showAlert, showDrawer } from "../../../redux/Alert/AlertSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Drawer = () => {
  const dispatch = useDispatch();
  const [TargetInput, setTargetInput] = useState(false);
  const cartlist = useSelector((state) => state.cart.cart);
  const drawer = useSelector((state) => state.alert.showdrawer);
  const token = sessionStorage.getItem("access");
  const navgation = useNavigate();
  const handleDecreaseQuantity = (item) => {
    if (item.QTE > 1) {
      dispatch(
        updateCartItemQuantity({
          id: item.id,
          QTE: item.QTE - 1,
        })
      );
    }
  };
  const handleIncreaseQuantity = (item) => {
    console.log(item.QTE);
    if (item.QTE < item.stock) {
      dispatch(
        updateCartItemQuantity({
          id: item.id,
          QTE: item.QTE + 1,
        })
      );
    } else {
      alert("Stock is limited for this item");
      console.log("Stock is limited for this item");
    }
  };
  const handleDrawerCommande = () => {
    if (token) {
      navgation("/votre-pannier");
      dispatch(showDrawer(!showDrawer));
    } else {
      toast.warn("this process require login  ", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleChangetarget = (e) => {
  console.log("target type touch start")
  };
  console.log(cartlist)
  return (
    <div className={`drawer ${drawer && "open"}`}>
      <div className="warpper">
        <div className="top-section">
          <h4>Votre panier</h4>
          <span onClick={() => dispatch(showDrawer(!showDrawer))}>
            <Close />
          </span>
        </div>
        {cartlist?.length !== 0 ? (
          <div className="list-cart-drawer">
            <div className="commande" onClick={() => handleDrawerCommande()}>
              <Link className="link">Confirm order</Link>
            </div>
            <span
              onClick={() => dispatch(restCart())}
              style={{
                color: "red",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Reset
            </span>
            {cartlist?.map((item) => {
              return (
                <div className="item" key={item.id}>
                  <img alt="" src={item.images[0]} />
                  <div className="info">
                    <div className="top-item">
                      <Link className="link" to={`/produit/${item.id}`}>
                        <h3>{item.title.slice(0, 12)} </h3>
                      </Link>
                      <div className="prix">{item.priceForPersonal} </div>
                    </div>
                    <p>{item?.content.slice(0, 19)}... </p>
                    <div className="add-to-cart">
                      <div
                        className="left"
                        onClick={() => handleDecreaseQuantity(item)}
                      >
                        -
                      </div>
                      <div
                        className="center"
                        onClick={handleChangetarget}
                        // onMouseDown={() => setTargetInput(!TargetInput)}
                        onMouseDown
                        onMouseUp
                        onTouchStart
                        onTouchEnd
                      >
                        {!TargetInput ? <>{item.QTE}</> : <input />}
                      </div>
                      <div
                        className="right"
                        onClick={() => handleIncreaseQuantity(item)}
                      >
                        +
                      </div>
                      <div
                        className="remove"
                        onClick={() =>
                          dispatch(removeItemFromCart(item.id, item))
                        }
                      >
                        <DeleteOutline />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-cart">
            <h1>Cart Empty</h1>
            <button>
              <Link className="link" to={"/"}>
                Shop Now{" "}
              </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Drawer;
