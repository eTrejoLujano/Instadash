import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "../../redux-store/authSlice";

const PrivateRoute = ({ redirectPath = "/", children }) => {
  const token = JSON.parse(window.localStorage.getItem("token"));
  const dispatch = useDispatch();

  useEffect(() => {
    let fourMinutes = 1000 * 60 * 4;
    let interval = setInterval(() => {
      if (token) {
        dispatch(updateToken());
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [token]);

  if (window.localStorage.getItem("token")) {
    return children;
  }
  return <Navigate to={redirectPath} replace />;
};

export default PrivateRoute;
