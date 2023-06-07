import { Navigate } from "react-router-dom";

const PrivateRoute = ({ redirectPath = "/", children }) => {
  if (!window.localStorage.getItem("token")) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export default PrivateRoute;
