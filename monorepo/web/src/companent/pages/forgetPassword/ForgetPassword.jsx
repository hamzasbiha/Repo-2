import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./ForgetPassword.scss";
import { RestPassword } from "../../../redux/client/ClientSlice";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [linkExpired, setLinkExpired] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true); // State to track password match
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const navgation = useNavigate();
  useEffect(() => {
    // Parse the URL and extract the "token" parameter when the component mounts
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Check if the passwords match whenever the "New Password" field changes
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    // Check if the passwords match whenever the "Confirm Password" field changes
    setPasswordMatch(e.target.value === password);
  };

  const handleSubmit = () => {
    dispatch(RestPassword({ token, password }));
    navgation("/connexion");
  };

  return (
    <div className="forget-form">
      <h1>Reset Password</h1>
      <div className="form">
        <div className="input-item">
          <div>
            <label>New Password</label>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="input-item">
          <div>
            <label>Confirm Password</label>
          </div>
          <input
            type="password"
            id="confirm"
            name="confirm"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        {passwordMatch ? null : (
          <div className="error-message">Passwords do not match.</div>
        )}
        <div className="btn">
          <button onClick={handleSubmit}>Reset Password</button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
