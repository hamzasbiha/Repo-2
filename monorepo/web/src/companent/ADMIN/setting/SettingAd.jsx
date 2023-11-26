import React, { useState } from "react";
import "./settingadmin.scss";
import { Link, Outlet } from "react-router-dom";

const SettingAd = () => {
  const [activeLink, setActiveLink] = useState("update-profile");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="setting-admin">
      <div className="nav-screen">
        <div
          className={`link-title ${
            activeLink === "update-profile" ? "active" : ""
          }`}
        >
          <Link
            to=""
            className={`link `}
            onClick={() => handleLinkClick("update-profile")}
          >
            <h1>update-Profile</h1>
          </Link>
        </div>
        <div
          className={`link-title ${
            activeLink === "update-password" ? "active" : ""
          }`}
        >
          <Link
            to="update-password"
            className={`link`}
            onClick={() => handleLinkClick("update-password")}
          >
            <h1>update-password</h1>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default SettingAd;
