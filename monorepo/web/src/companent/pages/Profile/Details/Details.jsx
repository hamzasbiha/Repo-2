import React from "react";
import * as Icon from "@mui/icons-material";
import "./Details.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Details = () => {
  const user = useSelector((state) => state.user.user);
  const cartInfo = useSelector((state) => state.cart.currentUserCart);
  console.log(cartInfo);
  return (
    <div className="Details">
      <div className="col">
        <div className="row">
          <div className="inforamtion">
            <div className="top-section">
              <h1>INFORMATIONS PERSONNELLES</h1>
              <span>
                <Link className="link" to={"setting"}>
                  <Icon.Edit />
                </Link>
              </span>
            </div>
            <p>
              {user.firstname} {user.lastname}
            </p>
            <span>{user.email}</span>
          </div>
        </div>
        <div className="row"></div>
      </div>
      <div className="col col-l">
        <div className="row">
          <div className="adresse">
            <div className="top-section">
              <h1>ADRESSE</h1>
              <span>
                <Link className="link" to={"adreese/update-adresse"}>
                  <Icon.Edit />
                </Link>
              </span>
            </div>
            <h1>Adresse par défaut :</h1>
            <p>
              {user.firstname} {user.lastname}
            </p>
            {cartInfo && <p>{cartInfo?.adresse}</p>}
            <p>{user?.phonenumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
