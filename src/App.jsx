import { Routes, Route } from "react-router-dom";
import UserHome from "./components/UserHome/UserHome";
import Login from "./components/Authentication/Login";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/Util/PrivateRoute";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { me } from "./store/authSlice";

function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        {/* <Navbar /> */}
        <Route exact path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute user={user}>
              <UserHome />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
