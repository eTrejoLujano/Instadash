import { useSelector, useDispatch } from "react-redux";
import { useLayoutEffect, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { me } from "./redux-store/authSlice";
import { Routes, Route } from "react-router-dom";
import UserHome from "./components/UserHome/UserHome";
import Login from "./components/Authentication/Login";
import SignUp from "./components/Authentication/SignUp";
import Navbar from "./components/Navbar";
import AuthBar from "./components/Authentication/AuthBar";
import PrivateRoute from "./components/Util/PrivateRoute";
import StoreView from "./components/Store/StoreView";
import SeeAll from "./components/Dashboard/SeeAll";
import MapWrapper from "./components/Pickup/MapWrapper";
import OrderHistory from "./components/Orders/OrderHistory";
import AccountInfo from "./components/Account/AccountInfo";
import SavedStores from "./components/Saved/SavedStores";
import CategoryView from "./components/Category/CategoryView";
import CheckoutView from "./components/Checkout/CheckoutView";
import { Wrapper } from "@googlemaps/react-wrapper";
import ReceiptMap from "./components/Orders/ReceiptMap";
import Footer from "./components/Footer";
import PasswordChange from "./components/Account/PasswordChange";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(me());
  }, []);
  const ScrollWrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
  };

  return (
    <ScrollWrapper>
      {auth.user ? (
        <Wrapper
          apiKey={import.meta.env.VITE_GOOGLE_KEY}
          version="beta"
          libraries={["marker", "places"]}
        >
          {" "}
          <Navbar />
        </Wrapper>
      ) : (
        <AuthBar />
      )}
      <Routes>
        {!auth.user && <Route exact path="/" element={<Login />} />}
        {!auth.user && <Route path="/signup" element={<SignUp />} />}
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
              {auth.location ? (
                <UserHome />
              ) : (
                <div className="h-screen w-screen text-center flex items-center justify-center text-red-600">
                  <div className="">
                    <div className="flex justify-center text-4xl">
                      Thank you for visiting Dashed Eats!
                    </div>
                    <div className="flex justify-center text-2xl">
                      Please enter any address to begin
                    </div>
                    <div className="flex justify-center text-xl">
                      **All addresses and receipts can be deleted to manage any
                      information stored in the database**
                    </div>
                  </div>
                </div>
              )}
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
              <MapWrapper />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/orders"
          element={
            <PrivateRoute>
              <OrderHistory />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders/receipt"
          element={
            <PrivateRoute>
              <ReceiptMap />
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
          path="/account/change-password"
          element={
            <PrivateRoute>
              <PasswordChange />
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
        <Route
          path="/category"
          element={
            <PrivateRoute>
              <CategoryView />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CheckoutView />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </ScrollWrapper>
  );
}

export default App;
