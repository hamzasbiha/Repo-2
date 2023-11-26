import React, { useState } from "react";
import "./Setting.scss";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { updateUser } from "../../../../redux/client/ClientSlice";
const Setting = () => {
  const dispatch = useDispatch();
  const [accType, setAccType] = useState(null);
  const user = useSelector((state) => state.user.user);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let updateduser = Object.fromEntries(formData);

    const userUpd = { ...updateduser, accountType: accType };
    let token = sessionStorage.getItem("access");
    dispatch(updateUser({ token: token, user: userUpd }));
  };
  console.log(accType);
  const handleChange = (event) => {
    setAccType(event.target.value);
  };
  console.log(user);
  return (
    <div className="setting">
      <h1>Gere vtore compte</h1>
      <form onSubmit={handleSubmit}>
        <div className="col">
          <div className="row">
            <label>Nom</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              defaultValue={user.firstname}
            />
          </div>
          <div className="row">
            <label>Prénom</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              defaultValue={user.lastname}
            />
          </div>
          <div className="row">
            <label>email</label>
            <input
              type="text"
              id="email"
              name="email"
              defaultValue={user.email}
            />
          </div>
          <div className="row">
            <label>mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="*******"
              required
            />
          </div>
        </div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            accountType
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={"PERSONAL"}>Personal</MenuItem>
            <MenuItem value={"SOCIETY"}>company</MenuItem>
          </Select>
        </FormControl>
        <div className="btn">
          <button>Update</button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
