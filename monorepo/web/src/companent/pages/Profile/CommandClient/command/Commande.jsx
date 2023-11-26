import "./Commande.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCart, updatecart } from "../../../../../redux/cartSlice";
import { Link, useParams } from "react-router-dom";
const Commande = ({}) => {
  const cart = useSelector((state) => state.cart.currentUserCart);
  const type = useParams().type;
  // const [listcart, setListCart] = useState();
  const user = useSelector((state) => state.user.user);
  const [toggle, setToggle] = useState(false);
  const error = useSelector((state) => state.cart.pending);
  let token = sessionStorage.getItem("access");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserCart({ id: user.id, token: token }));
    setToggle(false)
  }, [user.id, token,toggle]);

  const handleCancelOrder = () => {
    const id = cart.id;
    const status = { status: "Refund" };
    dispatch(updatecart({ token: token, id: id, inputs: status }));
    setToggle(true)
  };
  console.log(toggle)

  return (
    <>
      <div className="top">
        <Link to={`/profile/1/commande/Pending`} className="link">
          <span className={type === "Pending" ? `isPending` : ""}>
            Commandes Pending
          </span>
        </Link>
        <div
          className="line"
          style={{
            left: type === "Pending" ? 0 : "11%",
          }}
        ></div>
        <Link to={`/profile/1/commande/Refund`} className="link">
          <span className={type === "Refund" ? `isIssus` : ""}>
            Commandes Issus
          </span>
        </Link>
        <div className="item-incl"></div>
        <div className="cnl-btn">
          <button onClick={handleCancelOrder}>Cancel Order</button>
        </div>
      </div>
      <div className="left">
        {cart.order_Items && cart.status === type ? (
          cart?.order_Items.slice(0, 1).map((item) => {
            const product = item.products;
            return (
              <div className="item-cart" key={item.id}>
                <div className="item-c">
                  <div className="image">
                    <img alt="" src={product.images[0]} />
                  </div>
                </div>
                <div className="item-c">
                  <div>
                    <h1>{product.title} </h1>
                    <p>Commande {cart.id} </p>
                    <div className="t-s">
                      <span>{cart.status}</span>
                      <b>At {new Date(cart.createdAt).toLocaleDateString()} </b>
                    </div>
                  </div>
                </div>
                <div className="item-det">
                  <Link className="link" to={"list-commandes"}>
                    <b>Details</b>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div
            className="item"
            style={{
              color: "green",
            }}
          >
            <h1>No Order yet Go Get </h1>
            <Link to={"/"} className="link">
              You order
            </Link>
          </div>
        )}
        <div>
          <img />
        </div>
      </div>
    </>
  );
};

export default Commande;
