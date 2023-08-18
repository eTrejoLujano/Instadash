import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentAddress, updateToken } from "../../redux-store/authSlice";

const PrivateRoute = ({ redirectPath = "/", children }) => {
  const token = JSON.parse(window.localStorage.getItem("token"));
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // useEffect(() => {
  //   let fourMinutes = 1000 * 60 * 4;
  //   let interval = setInterval(() => {
  //     if (token) {
  //       dispatch(updateToken());
  //     }
  //   }, fourMinutes);
  //   return () => clearInterval(interval);
  // }, [token]);

  if (window.localStorage.getItem("token")) {
    if (!auth.location && auth.user) {
      dispatch(currentAddress({ user_id: auth.user.user_id }));
    }
    return children;
  }
  return <Navigate to={redirectPath} replace />;
};

export default PrivateRoute;
