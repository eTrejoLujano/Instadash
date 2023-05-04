import { useState } from "react";
import Navbar from "./components/Navbar";
import CategoryBar from "./components/CategoryBar";
import FoodTypes from "./components/FoodTypes";

function App() {
  return (
    <div>
      <Navbar />
      <CategoryBar />
      <FoodTypes />
    </div>
  );
}

export default App;
