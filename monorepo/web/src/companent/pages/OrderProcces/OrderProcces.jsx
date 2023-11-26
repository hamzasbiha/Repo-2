import React, { useEffect, useState } from "react";
import "./orderProcces.scss";
import Vérificationpaiement from "../Vérification et paiement/Vérificationpaiement";
import CheckoutForm from "../formcheckout/CheckoutForm";
import SuccesOrder from "../SuccesOrder/SuccesOrder";
import { useSelector } from "react-redux";

const OrderProcces = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [oldclient, setOldClient] = useState({});

  const userCart = useSelector((state) => state.cart.currentUserCart);
  const [filed, setFiled] = useState({});
  useEffect(() => {
    const validet = () => {
      switch (currentStep) {
        case 1:
          // Check if userCart has information
          if (userCart && userCart.order_Items && userCart.order_Items.length !== 0) {
            setOldClient(userCart);
            setCurrentStep(2);
          }
          break;
        case 2:
          // Check if filed has information
          if (Object.keys(filed).length !== 0) {
            setCurrentStep(2);
          }
          break;
        default:
          break;
      }
    };
    validet();
  }, [currentStep]);

  console.log(userCart);
  return (
    <div className="order">
      <div className="wrapper">
        <div className="top">
          <div className="circel" onClick={() => validet()}>
            <span>1</span>
          </div>
          <div
            className="circel"
            style={{
              backgroundColor:
                currentStep === 2
                  ? "#007bff"
                  : currentStep === 3
                  ? "#007bff"
                  : "gray",
            }}
            onClick={() => validet()}
          >
            <span>2</span>
          </div>
          <div
            className="circel"
            style={{
              backgroundColor:
                currentStep === 3
                  ? "#007bff"
                  : currentStep === 2
                  ? "gray"
                  : "gray",
            }}
            onClick={() => validet()}
          >
            <span>3</span>
          </div>
          <div
            className="line-onprogress-base"
            style={{
              width:
                currentStep === 2 ? "50%" : currentStep === 3 ? "80%" : "9%",
            }}
          >
            <span></span>
          </div>
          <div className={`line-onprogress`}>
            <span></span>
          </div>
        </div>
        <div className="title">
          {currentStep === 1 ? (
            <h1>Adresse de livraison</h1>
          ) : currentStep === 2 ? (
            <h1>DÉTAILS DE LIVRAISON</h1>
          ) : currentStep === 3 ? (
            <h1>MODE DE PAIEMENT</h1>
          ) : null}
        </div>
        {currentStep === 1 ? (
          <CheckoutForm
            filed={filed}
            setFiled={setFiled}
            oldclient={oldclient}
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
          />
        ) : currentStep === 2 ? (
          <Vérificationpaiement
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
            oldclient={oldclient}
            filed={filed}
          />
        ) : currentStep === 3 ? (
          <SuccesOrder />
        ) : null}
      </div>
    </div>
  );
};

export default OrderProcces;
