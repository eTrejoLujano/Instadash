import { useSelector } from "react-redux";
import { Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PrivateRoute = ({ redirectPath = "/", children }) => {
  if (!window.localStorage.getItem("token")) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export default PrivateRoute;
