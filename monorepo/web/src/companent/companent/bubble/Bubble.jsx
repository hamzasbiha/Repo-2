import React, { useState, useEffect } from "react";
import * as icon from "@mui/icons-material";
import "./Bubble.scss";
import { useDispatch, useSelector } from "react-redux";
import { showDrawer } from "../../../redux/Alert/AlertSlice";
import {
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
} from "react-scroll";

const Bubble = () => {
  const [isBubbleVisible, setBubbleVisible] = useState(false);
  const [showAdditionalBalls, setShowAdditionalBalls] = useState(false);
  const drawer = useSelector((state) => state.alert.showdrawer);
  const dispatch = useDispatch();
  useEffect(function () {
    function handleScroll() {
      if (window.scrollY > 100) {
        setBubbleVisible(true);
      } else {
        setBubbleVisible(false);
        setShowAdditionalBalls(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return function () {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleQuestionMarkClick() {
    setShowAdditionalBalls(!showAdditionalBalls);
  }
  const scrollToTop = () => {
    const options = {
      duration: 500,
      delay: 100,
      smooth: true,
      offset: 50,
    };
    scroll.scrollToTop(options);
  };
  return (
    <div
      className={"bubble " + (isBubbleVisible ? "visible" : "")}
      style={{
        opacity: isBubbleVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <div className="bubble-content">
        <div
          className={"ball"}
          style={{
            transition: "all 0.3s ease",
            transform:
              "translateY(" + (showAdditionalBalls ? "-60px" : "100px") + ")",
          }}
          onClick={() => handleQuestionMarkClick()}
        >
          <icon.QuestionMark />
        </div>
        <span
          className={"ball-1"}
          style={{
            transition: "all 0.3s ease",
            transform:
              "translateY(" + (showAdditionalBalls ? "-60px" : "0") + ")",
            opacity: showAdditionalBalls ? 1 : 0,
          }}
          onClick={() => scrollToTop()}
        >
          <icon.PanToolAlt />
        </span>
        <div
          className={"ball-1"}
          style={{
            transition: "all 0.3s ease",
            transform:
              "translateY(" + (showAdditionalBalls ? "-60px" : "0") + ")",
            opacity: showAdditionalBalls ? 1 : 0,
          }}
          onClick={() => dispatch(showDrawer(!drawer))}
        >
          <icon.ShoppingCart />
        </div>

        <div
          className={"ball-2"}
          style={{
            transition: "all 0.3s ease",
            transform:
              "translateY(" + (showAdditionalBalls ? "-60px" : "0") + ")",
            opacity: showAdditionalBalls ? 1 : 0,
          }}
          onClick={() =>
            window.scrollTo({
              top: window.scrollY + 3000,
              behavior: "smooth",
            })
          }
        >
          <icon.Message />
        </div>
      </div>
    </div>
  );
};

export default Bubble;
