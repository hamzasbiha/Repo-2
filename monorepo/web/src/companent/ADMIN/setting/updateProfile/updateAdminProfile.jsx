import { useDispatch, useSelector } from "react-redux";
import "./updateAProf.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { updateUser } from "../../../../redux/client/ClientSlice";

const UpdateAdminProfile = () => {
  const client = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const token = sessionStorage.getItem("access");
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const Usercredt = Object.fromEntries(formData);
    console.log(Usercredt);
    dispatch(
      updateUser({ token: token, user: Usercredt, password: password })
    ).then((action) => {
      console.log(action.type);
      if (action.type === "update/user/fulfilled") {
        toast.success("updated", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("worng password!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };

  return (
    <div className="updateAProf">
      <div className="add-container">
        <h1>Gere Votre Compte </h1>
        <ToastContainer />
        <div className="bottom-add">
          <div className="right-update">
            <form onSubmit={handleSubmit} className="center-form">
              <div className="formInput">
                <label>FirstName</label>
                <input
                  type="text"
                  id="firsname"
                  name="fullname"
                  defaultValue={client.firstname}
                />
              </div>
              <div className="formInput">
                <label>LastName</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  defaultValue={client.lastname}
                />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  defaultValue={client.email}
                />
              </div>
              <div className="formInput">
                <label>Phone number</label>
                <input
                  type="text"
                  id="phonenumber"
                  name="phonenumber"
                  defaultValue={client.phonenumber}
                />
              </div>
              <div className="formInput">
                <label>password</label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAdminProfile;
