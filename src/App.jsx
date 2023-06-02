import { Routes, Route } from "react-router-dom";
import UserHome from "./components/UserHome/UserHome";
import Login from "./components/Authentication/Login";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/Util/PrivateRoute";

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        {/* <Navbar /> */}
        <Route exact path="/" element={<Login />} />
        <Route
          exact
          path="/home"
          element={
            <PrivateRoute>
              <UserHome />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
