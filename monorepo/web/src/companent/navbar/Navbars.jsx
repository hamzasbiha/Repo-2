import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import example from "../../assets/resource/example.png";
import Drawer from "../companent/Drawer/Drawer";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import * as icon from "@mui/icons-material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchBar from "../companent/SearchBar/SearchBar";
import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/client/ClientSlice";
import { showDrawer } from "../../redux/Alert/AlertSlice";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
} from "react-scroll";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Navbars = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [langug, setLanguge] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const drawer = useSelector((state) => state.alert.showdrawer);
  const user = useSelector((state) => state.user.user);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const { t, i18n } = useTranslation();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("log out");
    return sessionStorage.removeItem("access");
  };

  const scrollToBottom = () => {
    const options = {
      duration: 500,
      delay: 100,
      smooth: true,
      offset: 50,
    };
    scroll.scrollToBottom(options);
  };
  const trackScroll = () => {
    if (window.scrollY >= 52) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };
  window.addEventListener("scroll", trackScroll);

  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  }, [isScrolling]);
  console.log(isScrolling);
  return (
    <div className="navbar">
      {showSearch && (
        <SearchBar showSearch={showSearch} setShowSearch={setShowSearch} />
      )}
      {!showSearch ? (
        <div className="main-nav">
          <div className={`top`}>
            <div className="item">
              <span>
                <icon.Mail />
              </span>
              <span>lemondeoiseau@gmail.com</span>
            </div>
            <div className="item">
              <span className="phone">
                <icon.Phone />
              </span>
              <span>+ 216 95 654 845</span>
            </div>
          </div>
          <div
            className="wrapper-nav"
            style={{
              position: isScrolling ? "fixed" : "",
              top: isScrolling ? 0 : "",
              width: isScrolling ? "100%" : "",
              backgroundColor: isScrolling ? "#f2f2f2" : "",
              transition: "all 0.5s ease",
            }}
          >
            <div className="left-nav">
              <div className="item">
                <img src={example} alt="" />
              </div>
              <div className="item">
                <Link className="link" to="/">
                  Le monde de oiseau
                </Link>
              </div>
            </div>
            <div className="right">
              <div className="item">
                <Link className="link" to="/">
                  {t("Boutique")}
                </Link>
              </div>
              <div className="item" onClick={scrollToBottom}>
                <span
                  className="link"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Contact
                </span>
              </div>
              <div className="item">
                <Link className="link" to="/produits/Chien">
                  {t("Chien")}
                </Link>
              </div>
              <div className="item">
                <Link className="link" to="/produits/Chat">
                  {t("Chats")}
                </Link>
              </div>
              <div className="item">
                <Link className="link" to="/produits/Oiseaux">
                  {t("Oiseaux")}
                </Link>
              </div>
              <div className="icons">
                <SearchIcon onClick={() => setShowSearch(true)} />
                <PersonOutlineOutlinedIcon
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                />

                <div
                  className="cartIcon"
                  onClick={() => dispatch(showDrawer(!drawer))}
                >
                  <ShoppingCartOutlinedIcon />
                  <span>{cart?.length} </span>
                </div>
                {isDropdownOpen && (
                  <div className="drop-menu">
                    {!sessionStorage.getItem("access") ? (
                      <div className="item">
                        {" "}
                        <Link
                          className="link"
                          to={"/connexion"}
                          onClick={() => setDropdownOpen(false)}
                        >
                          {t("Connexion")}
                        </Link>
                      </div>
                    ) : (
                      <div className="item">
                        {user.accountType !== "Admin" ? (
                          <Link
                            className="link"
                            to={`/profile/${user.id}`}
                            onClick={() => setDropdownOpen(false)}
                          >
                            {t("Compte")}
                          </Link>
                        ) : (
                          <Link
                            to={"/profile-admin"}
                            onClick={() => setDropdownOpen(false)}
                            className="link"
                          >
                            {t("Admin")}
                          </Link>
                        )}
                      </div>
                    )}
                    <div className="space"></div>
                    {!sessionStorage.getItem("access") ? (
                      <div className="item">
                        <Link
                          className="link"
                          to={"/creation de compte"}
                          onClick={() => setDropdownOpen(false)}
                        >
                          {t("creation de compte ")}
                        </Link>
                      </div>
                    ) : (
                      <div className="item">
                        <Link
                          className="link"
                          onClick={() => {
                            setDropdownOpen(false);
                            handleLogout();
                          }}
                        >
                          <span>{t("Deconnexion")}</span>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
                <div className="item">
                  <span
                    id="demo-positioned-button"
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <icon.Language />
                  </span>
                </div>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <span onClick={() => setLanguge("fr")}>fr-Fr</span>{" "}
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <span onClick={() => setLanguge("en")}>en-EN</span>
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <Drawer />
    </div>
  );
};

export default Navbars;
