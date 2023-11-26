import React from "react";
import { Link } from "react-router-dom";
import * as Icon from "@mui/icons-material";
import "./SuccesOrder.scss";
import { useDispatch } from "react-redux";
import { restCart } from "../../../redux/cartSlice";
const SuccesOrder = () => {
  const dispatch = useDispatch();
  return (
    <div className="succes">
      <div>
        <p>Paiement CASH à la livraison</p>
      </div>
      <div>
        <p>
          We appreciate your trust in our services and look forward to serving
          you in person
        </p>
      </div>
      <div className="icon">
        <Icon.DoneAll />
      </div>
      <Link to={"/"} className="link" onClick={() => dispatch(restCart())}>
        <button>Continue Shopping</button>
      </Link>
    </div>
  );
};

export default SuccesOrder;
