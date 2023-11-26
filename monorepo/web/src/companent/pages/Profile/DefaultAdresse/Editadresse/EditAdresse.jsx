import React from "react";
import * as Icon from "@mui/icons-material";
import { useSelector } from "react-redux";
import "./editadresse.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const EditAdresse = () => {
  const cart = useSelector((state) => state.cart.currentUserCart);
  const navgation = useNavigate();

  return (
    <div className="edit">
      <div className="goback">
        <Link onClick={() => navgation(-1)}>
          <Icon.ArrowBack />
        </Link>
      </div>
      <div className="col">
        <div className="row">
          <input type="text" placeholder="ville" defaultValue={cart.adresse} />
        </div>
        <div className="row">
          <input
            type="text"
            placeholder="adresse"
            defaultValue={cart.adresse}
          />
        </div>
        <div className="row">
          <input
            type="text"
            placeholder="code postal"
            defaultValue={cart.codepos}
          />
        </div>
        <div className="row">
          <input
            type="text"
            placeholder="phone number"
            defaultValue={cart.phone}
          />
        </div>
      </div>
    </div>
  );
};

export default EditAdresse;
