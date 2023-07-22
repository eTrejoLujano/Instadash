import { Routes, Route } from "react-router-dom";
import UserHome from "./components/UserHome/UserHome";
import Login from "./components/Authentication/Login";
import SignUp from "./components/Authentication/SignUp";
import Navbar from "./components/Navbar";
import AuthBar from "./components/Authentication/AuthBar";
import PrivateRoute from "./components/Util/PrivateRoute";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { me } from "./store/authSlice";
import StoreView from "./components/Business/StoreView";

function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
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
      </Routes>
    </div>
  );
}

export default App;
