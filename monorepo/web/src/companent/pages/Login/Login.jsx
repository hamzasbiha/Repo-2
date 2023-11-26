import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { BaseUrl } from "../../../api/URL";
const Login = () => {
  const [validet, setValidet] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [emailfocused, setEmailFocused] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const navigation = useNavigate();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const user = Object.fromEntries(formdata);
    try {
      const res = await axios.post(`${BaseUrl}/api/auth/signin`, user);
      sessionStorage.setItem("access", res.data.accesToken);
      navigation(-1);
      toast.success("Welcome");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("wrong credential");
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );
      const user = {
        fullname: userInfo.data.name,
        email: userInfo.data.email,
        accountType: "PERSONAL",
      };
      const myResponse = await axios.post(`${BaseUrl}/api/auth/google`, user);
      sessionStorage.setItem("access", myResponse.data.accesToken);
      navigation(-1);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="login">
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <h1>Connexion</h1>
          <div className="input-list">
            <div className="inputitem">
              <span
                style={{
                  transform: emailfocused
                    ? "translateX(10px) translateY(-17px) "
                    : "",
                  fontSize: emailfocused ? "1.05em" : "",
                  padding: emailfocused ? "0 10px" : "",
                  color: emailfocused ? "#343a40" : "",
                  transition: "all 0.5s ease",
                  opacity: !emailfocused && validet.email !== "" ? "0" : "100%",
                }}
              >
                Email
              </span>
              <input
                type="email"
                name="email"
                onChange={(e) =>
                  setValidet({ ...validet, email: e.target.value })
                }
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                required
              />
            </div>
            <div className="inputitem" name="password">
              <span
                style={{
                  transform: passwordFocus
                    ? "translateX(10px) translateY(-17px) "
                    : "",
                  fontSize: passwordFocus ? "1.05em" : "",
                  padding: passwordFocus ? "0 10px" : "",
                  color: passwordFocus ? "#343a40" : "",
                  transition: "all 0.5s ease",
                  opacity:
                    !passwordFocus && validet.password !== "" ? "0" : "100%",
                }}
              >
                Password
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                onChange={(e) =>
                  setValidet({ ...validet, password: e.target.value })
                }
                required
              />
            </div>
            <div className="toggle-show">
            <div>
              <input type="checkbox" onClick={togglePasswordVisibility} />
               Show password ?
            </div>
            <Link className="link" to={"/forget-password"}>
              Forget password ?
            </Link>
          </div>
          </div>
          {!Loading ? (
            <button>Connexion</button>
          ) : (
            <>
              <CircularProgress
                style={{
                  position: "absolute",
                }}
              />
              <button disabled={Loading}>Connexion</button>
            </>
          )}
          <span className="or">
            <div className="center">Or</div>
          </span>
          <div className="google-btn" onClick={() => googleLogin()}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
          <div className="nav">
            <span>Nouveaux clients ? </span>
            <Link className="link" to={"/creation de compte"}>
              <span className="linkpage">Créez votre compte</span>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
