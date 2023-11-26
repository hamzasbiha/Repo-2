import React, { useState } from "react";
import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { BaseUrl } from "../../../api/URL";
const Register = () => {
  const navgation = useNavigate();
  const [accounteTypes, setAccounteTypes] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validet, setValidet] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    confiPass: "",
    phone: "",
  });
  const [firstname, setFirstName] = useState(false);
  const [lastname, setLastName] = useState(false);
  const [emailfocused, setEmailFocused] = useState(false);
  const [password, setPassword] = useState(false);
  const [confiPass, setConfiPass] = useState(false);
  const [phone, setPhone] = useState(false);
  const navigation = useNavigate();
  const handleAccountType = (event) => {
    setAccounteTypes(event.target.value);
  };
  const handleSubmite = async (e) => {
    e.preventDefault();
    const Formdata = new FormData(e.currentTarget);
    const data = Object.fromEntries(Formdata);
    const userData = { ...data, accountType: accounteTypes };
    console.log(userData.accountType);
    const type = userData.accountType;

    if (type === "Personal" || type === "Society") {
      const res = await axios
        .post(`${BaseUrl}/api/auth/signup`, userData)
        .then((res) => res.data)
        .catch((error) => {
          console.log(error);
        });
      navgation("/connexion");
      console.log(res);
      alert("successfully created account");
    } else {
      alert("Invalid account type selected.");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );
      console.log(userInfo.data.name);
      const user = {
        fullname: userInfo.data.name,
        email: userInfo.data.email,
        accountType: "Personal",
      };
      console.log(user);
      const myResponse = await axios.post(`${BaseUrl}/api/auth/google`, user);
      sessionStorage.setItem("access", myResponse.data.accesToken);
      navigation("/");
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="Register">
      <form onSubmit={handleSubmite}>
        <h1>s'inscrire</h1>
        <div className="input-list">
          <div className="inputitem">
            <span
              style={{
                transform: firstname
                  ? "translateX(10px) translateY(-17px) "
                  : "",
                fontSize: firstname ? "1.05em" : "",
                padding: firstname ? "0 10px" : "",
                color: firstname ? "#343a40" : "",
                transition: "all 0.3s ease",
                opacity: !firstname && validet.firstname !== "" ? "0" : "100%",
              }}
            >
              fullname
            </span>
            <input
              type="text"
              name="fullname"
              onFocus={() => setFirstName(true)}
              onBlur={() => setFirstName(false)}
              onChange={(e) =>
                setValidet({ ...validet, fullname: e.target.value })
              }
              required
            />
          </div>
          <div className="inputitem">
            <span
              style={{
                transform: emailfocused
                  ? "translateX(10px) translateY(-17px) "
                  : "",
                fontSize: emailfocused ? "1.05em" : "",
                padding: emailfocused ? "0 10px" : "",
                color: emailfocused ? "#343a40" : "",
                transition: "all 0.3s ease",
                opacity: !emailfocused && validet.email !== "" ? "0" : "100%",
              }}
            >
              Email
            </span>
            <input
              type="email"
              name="email"
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              onChange={(e) =>
                setValidet({ ...validet, email: e.target.value })
              }
              required
            />
          </div>
          <div className="inputitem">
            <span
              style={{
                transform: password
                  ? "translateX(10px) translateY(-17px) "
                  : "",
                fontSize: password ? "1.05em" : "",
                padding: password ? "0 10px" : "",
                color: password ? "#343a40" : "",
                transition: "all 0.3s ease",
                opacity: !password && validet.password !== "" ? "0" : "100%",
              }}
            >
              Password
            </span>
            <input
              type={!showPassword ? `password` : "text"}
              name="password"
              onFocus={() => setPassword(true)}
              onBlur={() => setPassword(false)}
              onChange={(e) =>
                setValidet({ ...validet, password: e.target.value })
              }
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
              title="Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long."
              required
            />
          </div>
          <div className="inputitem">
            <span
              style={{
                transform: confiPass
                  ? "translateX(10px) translateY(-17px) "
                  : "",
                fontSize: confiPass ? "1.05em" : "",
                padding: confiPass ? "0 10px" : "",
                color: confiPass ? "#343a40" : "",
                transition: "all 0.3s ease",
                opacity: !confiPass && validet.confiPass !== "" ? "0" : "100%",
              }}
            >
              Confirem Password
            </span>
            <input
              type={!showPassword ? `password` : "text"}
              name="password"
              onFocus={() => setConfiPass(true)}
              onBlur={() => setConfiPass(false)}
              onChange={(e) =>
                setValidet({ ...validet, confiPass: e.target.value })
              }
              required
            />
          </div>
          <div className="inputitem">
            <span
              style={{
                transform: phone ? "translateX(10px) translateY(-17px) " : "",
                fontSize: phone ? "1.05em" : "",
                padding: phone ? "0 10px" : "",
                color: phone ? "#343a40" : "",
                transition: "all 0.3s ease",
                opacity: !phone && validet.phone !== "" ? "0" : "100%",
              }}
            >
              Phone
            </span>
            <input
              type="text"
              name="phonenumber"
              onFocus={() => setPhone(true)}
              onBlur={() => setPhone(false)}
              onChange={(e) =>
                setValidet({ ...validet, phone: e.target.value })
              }
              required
            />
          </div>
        </div>
        <div className="inputitemCheckbox">
          <input type="checkbox" onClick={togglePasswordVisibility} />
          Show password ?
        </div>
        <div className="radio">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              accounteType
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="accounteType"
              onChange={handleAccountType}
              value={accounteTypes}
            >
              <MenuItem value={"Personal"}>personal</MenuItem>
              <MenuItem value={"Society"}>society</MenuItem>
            </Select>
          </FormControl>
        </div>
        <button>Connexion</button>
        <span className="or">
          <div className="center">Or</div>
        </span>
        <div class="google-btn" onClick={() => googleLogin()}>
          <div class="google-icon-wrapper">
            <img
              class="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          </div>
          <p class="btn-text">
            <b>Sign in with google</b>
          </p>
        </div>
        <div></div>
        <div className="navgationto">
          <span>Anciens clients ? </span>
          <Link className="link" to={"/connexion"}>
            <span className="linkpage">Connectez-vous</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
