import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
const UserAuth = ({ element: Component, ...rest }) => {
  const [cookies] = useCookies();

  // Check if the user is not authenticated
  const isAuthenticated = sessionStorage.getItem("token");
  console.log(isAuthenticated);
  // If the user is not authenticated, redirect to the signin page
  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }
  // If the user is authenticated, render the protected component
  return <Component {...rest} />;
};

export default UserAuth;
