import React, { useState } from "react";
import "./Delete.scss";
import { useDispatch } from "react-redux";
import { deleteAccoute } from "../../../../redux/client/ClientSlice";
import { useNavigate } from "react-router-dom";

const DeleteAcount = () => {
  const [pass, setPass] = useState("");
  const token = sessionStorage.getItem("access");
  const dispatch = useDispatch();
  const navgation = useNavigate();
  const handledeleteAccounte = () => {
    dispatch(deleteAccoute({ token: token, password: pass }))
      .then((action) => {
        if (action.type === "deleteAccount/fulfilled") {
          navgation("/");
        } else if (action.type === "deleteAccount/rejected") {
          console.log("something went wrong");
        }
      })
  };
  return (
    <div className="dele">
      <div className="top">
        <h1>Delete Accounte</h1>
      </div>
      <div className="pass">
        <label>Password</label>
      </div>
      <input
        type="password"
        placeholder="*******"
        onChange={(e) => setPass(e.target.value)}
        required
      />
      <div className="btn">
        <button onClick={handledeleteAccounte}>Delete Account</button>
      </div>
    </div>
  );
};

export default DeleteAcount;
