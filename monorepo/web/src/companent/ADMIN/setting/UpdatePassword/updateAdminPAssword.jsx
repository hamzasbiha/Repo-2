import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { updatPassword } from "../../../../redux/client/ClientSlice";
import "./updateAP.scss";

const UpdateAdminPAssword = () => {
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [passwordsMatch, setPasswordsMatch] = useState(true); // State to track password matching
  const user = useSelector((state) => state.user.user);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

      // Dispatch the action when passwords match
      dispatch(updatPassword({ token: token, user: userNewPassword }));
    } else {
      setPasswordsMatch(false);
      toast.error("Passwords do not match");
    }
  };

  return (
    <div className="updateAdminPass">
      <div className="add-container">
        <h1>Change Mot de Passe</h1>
        <ToastContainer />
        <div className="bottom-add">
          <div className="right-pass">
            <form onSubmit={handleSubmit}>
              <div className="formInput"></div>
              <div className="formInput">
                <label>password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  inputMode="numeric"
                  id="password"
                  name="password"
                />
              </div>
              <div className="formInput"></div>
              <div className="formInput">
                <label>New Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  inputMode="numeric"
                  id="newPassword"
                  name="newPassword"
                />
              </div>
              <div className="formInput"></div>
              <div className="formInput">
                <label>Confirm Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  inputMode="numeric"
                  id="confirmPassword"
                  name="confirmPassword"
                />
              </div>
              <div>
                <input
                  type="checkbox"
                  onClick={togglePasswordVisibility}
                  style={{
                    padding: "10px",
                  }}
                />
                <span> Show password</span>
              </div>
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAdminPAssword;
