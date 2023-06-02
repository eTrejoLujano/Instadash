import { useSelector } from "react-redux";
import { Routes, Navigate } from "react-router-dom";

const PrivateRoute = ({ user, redirectPath = "/", children }) => {
  console.log("Private Route Works");

  console.log("user", user);
  // if (!user) {
  //   return <Navigate to={redirectPath} replace />;
  // }
  if (user) {
    return children;
  }
};

export default PrivateRoute;
