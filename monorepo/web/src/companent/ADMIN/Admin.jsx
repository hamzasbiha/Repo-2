import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import * as icon from "@mui/icons-material";
import { useDispatch } from "react-redux";
import "./admin.scss";
import { fetchclient } from "../../redux/admin/adminSlice";
const Admin = () => {
  const token = sessionStorage.getItem("access");

  const disptach = useDispatch();

  useEffect(() => {
    disptach(fetchclient(token));
  }, [token]);
  return (
    <div className="ProfilAd">
      <div className="wrapper">
        <div className="left-side ">
          <div className="side-list">
            <div className="item">
              <span>
                <icon.Person />
              </span>
              <Link to={""} className="link">
                Profile
              </Link>
            </div>
            <div className="item">
              <icon.People />
              <Link to={"client-list"} className="link">
                client-list
              </Link>
            </div>
            <div className="item">
              <span>
                <icon.List />
              </span>
              <Link to={"sells"} className="link">
                products-list
              </Link>
            </div>
            <div className="item">
              <icon.Settings />
              <Link to={"setting-admin"} className="link">
                Setting
              </Link>
            </div>
            <div className="item">
              <span>
                <icon.LocalShipping />
              </span>
              <Link to={"les-commandes"} className="link">
                Deliver
              </Link>
            </div>
            <div className="item">
              <span>
                <icon.AddBusiness />
              </span>
              <Link to={"ajoute"} className="link">
                Add New Product
              </Link>
            </div>
            <div className="item">
              <span>
                <icon.Logout />
              </span>
              <Link to={"setting-admin"} className="link">
                Log out
              </Link>
            </div>
          </div>
        </div>
        <div className="right-side">
          <Outlet />
        </div>
        <div className="center"></div>
      </div>
    </div>
  );
};

export default Admin;
