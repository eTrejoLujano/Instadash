import { Routes, Route } from "react-router-dom";
import UserHome from "./components/UserHome/UserHome";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserHome />} />
      </Routes>
    </div>
  );
}

export default App;
