import { Routes, Route } from "react-router-dom";
import UserHome from "./components/UserHome/UserHome";
import Login from "./components/Authentication/Login";
import SignUp from "./components/Authentication/SignUp";
import Navbar from "./components/Navbar";
import AuthBar from "./components/Authentication/AuthBar";
import PrivateRoute from "./components/Util/PrivateRoute";
import { useSelector, useDispatch } from "react-redux";
import { useLayoutEffect, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { me } from "./store/authSlice";
import StoreView from "./components/Business/StoreView";
import SeeAll from "./components/Dashboard/SeeAll";
import PickupView from "./components/Pickup/PickupView";
import OrderHistory from "./components/Orders/OrderHistory";
import AccountInfo from "./components/Account/AccountInfo";
import SavedStores from "./components/Saved/SavedStores";

function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(me());
  }, []);

  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
  };

  return (
    <Wrapper>
      {user ? <Navbar /> : <AuthBar />}
      <Routes>
        {!user && <Route exact path="/" element={<Login />} />}
        {!user && <Route path="/signup" element={<SignUp />} />}
        <Route
          path="*"
          element={
            <PrivateRoute>
              <UserHome />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <UserHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/store"
          element={
            <PrivateRoute>
              <StoreView />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <SeeAll />
            </PrivateRoute>
          }
        />
        <Route
          path="/pickup"
          element={
            <PrivateRoute>
              <PickupView />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <OrderHistory />
            </PrivateRoute>
          }
        />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <AccountInfo />
            </PrivateRoute>
          }
        />
        <Route
          path="/saved"
          element={
            <PrivateRoute>
              <SavedStores />
            </PrivateRoute>
          }
        />
      </Routes>
    </Wrapper>
  );
}

export default App;
