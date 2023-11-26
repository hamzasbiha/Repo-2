import React from "react";
import example from "../../assets//resource/example.png";
import "./Footer.scss";
const Footer = () => {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <div className="footer">
      <div className="top-footer">
        <div className="item">
          <h1>PRODUITS</h1>
          <span>Nouveaux produits</span>
          <span>Meilleures ventes</span>
          <span>Chien</span>
          <span>Chats</span>
          <span>Oiseaux</span>
        </div>
        <div className="item">
          <h1>CONTACT</h1>
          <span>le monde de oiseaux</span>
          <span>telephon: +213 78 549 246</span>
          <span>email: example@gmail.tn</span>
        </div>
        <div className="item">
          <h1>VOTRE COMPTE</h1>
          <span>Informations personnelles</span>
          <span>Commandes</span>
          <span>Adresses</span>
        </div>
      </div>
      <div className="bottom-footer ">
        <div className="left-footer">
          <img alt="" src={example} />
          <span className="Copyright">
            © Copyright {year} le monde des oiseaux.tn .
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
