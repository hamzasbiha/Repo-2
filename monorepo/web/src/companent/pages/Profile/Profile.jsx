import React, { useEffect } from "react";
import "./Profile.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserApi, logout } from "../../../redux/client/ClientSlice";
import { fetchSingleCart, fetchallcart } from "../../../redux/cartSlice";
const Profile = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const user = useSelector((state) => state.user.user);
  const token = sessionStorage.getItem("access");
  useEffect(() => {
    let token = sessionStorage.getItem("access");
    dispatch(fetchUserApi(token));
    if (user.id !== undefined) {
      dispatch(fetchSingleCart({ id: user.id, token: token }));
    }
  }, [dispatch, token]);
  const handleLogout = () => {
    dispatch(logout());
    navigator("/");
    return sessionStorage.removeItem("access");
  };

  return (
    <div className="profile">
      <div className="list-nav">
        <h1>Mon compte</h1>
        <div className="divier"></div>
        <div className="item">
          <Link to={""} className="link">
            <span>Votre Compte</span>
          </Link>
        </div>
        <div className="item">
          <Link to={"commande/pending"} className="link">
            <span>Vos commands</span>
          </Link>
        </div>
        <div className="item">
          <Link to={"commande/pending"} className="link">
            <span>Message Box</span>
          </Link>
        </div>
        <div className="item">
          <Link className="link" to={"setting"}>
            <span>Gérez votre Compte</span>
          </Link>
        </div>
        <div className="item">
          <Link className="link" to={"update-password"}>
            <span>modifier votre mot de passe</span>
          </Link>
        </div>
        <div className="item">
          <Link className="link" to={"adreese"}>
            <span>Adresses</span>
          </Link>
        </div>
        <div className="item">
          <Link className="link" to={"delete"}>
            <span>Fermer le compte</span>
          </Link>
        </div>
        <div className="item">
          <Link className="link" to={"verify-accounte"}>
            <span>Verifiy votre compte</span>
          </Link>
        </div>
        <div className="item-deco">
          <div className="row" onClick={() => handleLogout()}>
            <h1>Déconnexion</h1>
          </div>
        </div>
      </div>
      <div className="right">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
