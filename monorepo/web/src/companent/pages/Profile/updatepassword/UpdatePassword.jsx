import React, { useState } from "react";
import "./UpdatePassword.scss";
import { useDispatch, useSelector } from "react-redux";
import { updatPassword } from "../../../../redux/client/ClientSlice";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [passwordUpdate, setPasswordUpdate] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPasswordValue = formData.get("newPassword");
    const confirmPasswordValue = formData.get("confirmPassword");
    const token = sessionStorage.getItem("access");
    const userNewPassword = {
      password: formData.get("password"),
      NewPassword: formData.get("newPassword"),
    };
    if (newPasswordValue === confirmPasswordValue) {
      setNewPassword(newPasswordValue);
      setPasswordsMatch(true);
      dispatch(updatPassword({ token: token, user: userNewPassword }));
    } else {
      setPasswordsMatch(false);
      console.log("Passwords do not match");
    }
  };

  return (
    <div className="update">
      <h1>Change password</h1>
      <form className="passform" onSubmit={handleSubmit}>
        <div className="input-item">
          <div>
            <label>Old Password</label>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="*******"
          />
        </div>
        <div className="input-item">
          <div>
            <label>New password</label>
          </div>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="*******"
          />
        </div>
        <div className="input-item">
          <div>
            <label>Confirm password</label>
          </div>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="*******"
          />
        </div>
        {passwordsMatch === false && (
          <div
            className="error-message"
            style={{
              color: "red",
            }}
          >
            Passwords do not match!
          </div>
        )}
        <div className="btn">
          <button>Change your password</button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
