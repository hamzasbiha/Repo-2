import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Verify.scss";
import { useEffect, useState, useRef } from "react";
import { CircularProgress } from "@mui/material";
import {
  verifcation,
  verifyAccounte, // Use verifyAccounte, not verifyAccount
} from "../../../../redux/client/ClientSlice";

const VerifyAccounte = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);
  const [nextView, setNextView] = useState(false);
  const [btnTrigger, setBtnTrigger] = useState(false);
  const [firstView, setFirstView] = useState(true);
  const [code, setCode] = useState("");
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const token = sessionStorage.getItem("access");
  const [btnTriggerResend, setBtnTriggerResend] = useState(false);
  const navigation = useNavigate();
  const handleInputChange = (index, e) => {
    const value = e.target.value;
    setCode((prevCode) => {
      // Use the previous code and update the character at the current index
      const updatedCode = prevCode.split("");
      updatedCode[index] = value;
      return updatedCode.join("");
    });

    if (value.length >= 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    } else if (value.length === 0 && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key < "0" || e.key > "9") {
      e.preventDefault();
    }
  };

  const handleVerify = () => {
    setLoading(true);
    setBtnTrigger(true);
    dispatch(verifcation(token))
      .then((action) => {
        console.log(action);
        if (action.type === "verify/fulfilled") {
          setTimeout(() => {
            setLoading(false);
            setFirstView(false);
            setBtnTrigger(false);
            setNextView(true);
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleVerification = () => {
    setBtnTrigger(true);
    setBtnTriggerResend(true);
    setLoading(true);
    dispatch(verifyAccounte({ VN: code, token }))
      .then((action) => {
        if (action.type === "verify/accounte/fulfilled") {
          setTimeout(() => {
            navigation("/");
            setLoading(false);
          }, 3000);
        } else {
          if (action.type === "verify/accounte/rejected") {
            setTimeout(() => {
              setBtnTriggerResend(false);
              setLoading(false);
            }, 3000);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Clear any existing timeouts when the component unmounts
  useEffect(() => {
    console.log(code);
    return () => {
      // setBtnTrigger(false);
      clearTimeout();
    };
  }, [code]);
  console.log(inputRefs);
  return (
    <div className="verify">
      {firstView && (
        <>
          <h1>Verify your email</h1>
          <p>Hello {user.firstname}, we need to verify your email, please</p>
          <div className="btn-verif">
            <button onClick={() => handleVerify()} disabled={btnTrigger}>
              {loading ? <CircularProgress size={21} /> : "verify email"}
            </button>
          </div>
        </>
      )}
      {nextView && (
        <div className="otp-card">
          <h1>Verification code</h1>
          <p>
            Code has been sent to{" "}
            <b>
              {user.email.slice(0, 3)}****
              {user.email.slice(10, 15)}
            </b>
          </p>
          <div className="otp-inputs">
            {inputRefs.map((inputRef, index) => (
              <input
                key={index}
                type="text"
                placeholder="0"
                inputMode="numeric"
                onChange={(e) => handleInputChange(index, e)}
                onKeyPress={handleKeyPress}
                ref={inputRef}
                maxLength={1}
                required
              />
            ))}
          </div>
          <button onClick={handleVerification} disabled={btnTriggerResend}>
            {loading ? <CircularProgress size={21} /> : "verify"}
          </button>
          {/* <CircularProgress /> */}
          <p>
            If you didn't receive a code?{" "}
            <button
              className="resend-button"
              disabled={btnTriggerResend}
              onClick={() => handleVerify()}
            >
              resend
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default VerifyAccounte;
