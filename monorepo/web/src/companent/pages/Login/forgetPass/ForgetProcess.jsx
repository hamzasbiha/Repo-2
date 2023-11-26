import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./ForgetProcess.scss";
import { forgetPassword } from "../../../../redux/client/ClientSlice";
import { ToastContainer, toast } from "react-toastify";

const ForgetProcess = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [intervalId, setIntervalId] = useState(null); // Store the interval ID

  const dispatch = useDispatch();

  const handleForgetpass = () => {
    dispatch(forgetPassword({ email: email })).then((action) => {
      console.log(action.type);
      if (action.type === "forget/rejected") {
        setError(true);
        setSuccess(false);
        toast.error("Verify your email please", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (action.type === "forget/fulfilled") {
        setSuccess(true);
        setError(false);
        setShowTimer(true);

        // Set the interval and store the interval ID
        const id = setInterval(() => {
          setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);
        setIntervalId(id);

        // Clear the interval after 60 seconds (1 minute)
        setTimeout(() => {
          setShowTimer(false);
          clearInterval(intervalId); // Use the stored interval ID to clear it
        }, 60000);
      }
    });
  };

  useEffect(() => {
    // Cleanup function to clear the interval when the component unmounts
    return () => {
      if (intervalId) {
        clearInterval(intervalId); // Use the stored interval ID to clear it
      }
    };
  }, [intervalId]);

  return (
    <div className="Fp">
      <ToastContainer />
      <div className="forget">
        <h1>Forget Password</h1>
        <div>
          <div className="label">
            <label>Email</label>
          </div>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="btn">
          <button onClick={() => handleForgetpass()}>Send</button>
        </div>
        {error && (
          <span
            style={{
              color: "red",
              fontSize: "16px",
            }}
          >
            Verify your email please
          </span>
        )}
        {showTimer && (
          <div>
            <span
              style={{
                color: "green",
                fontSize: "16px",
              }}
            >
              Check your email please
            </span>
            <span>
              Time remaining: {countdown} seconds
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetProcess;
