import { Route, Navigate } from "react-router-dom";
import React from "react";

const PrivateRoute = ({ children, ...rest }) => {
  console.log("Private Route Works");
  const authenticated = false;
  return (
    <Route {...rest}>{authenticated ? <Navigate to="/" /> : children}</Route>
  );
};

export default PrivateRoute;
