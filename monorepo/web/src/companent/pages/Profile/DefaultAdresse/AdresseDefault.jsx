import React from "react";
import * as Icon from "@mui/icons-material";
import { useSelector } from "react-redux";
import "./adresse.scss";
import { Link } from "react-router-dom";
const AdresseDefault = () => {
  const cart = useSelector((state) => state.cart.currentUserCart);
  const user = useSelector((state) => state.user.user);
  console.log(cart);
  return (
    <div className="ads">
      <div className="col col-l">
        <div className="row">
          <div className="adresse">
            <div className="top-section">
              <h1>ADRESSE</h1>
              <span>
                <Link className="link" to={"update-adresse"}>
                  <Icon.Edit />
                </Link>
              </span>
            </div>
            <h1>Adresse par défaut :</h1>
            <p>
              {user.firstname} {user.lastname}
            </p>
            <p>{cart.adresse}</p>
            <p>{cart?.phonenumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdresseDefault;
