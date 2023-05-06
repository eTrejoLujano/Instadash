import { useState } from "react";
import Navbar from "./components/Navbar";
import CategoryBar from "./components/CategoryBar";
import FoodTypes from "./components/FoodTypes";
import Filterbar from "./components/Filterbar";
import Ads from "./components/Ads";

function App() {
  return (
    <div>
      <Navbar />
      <CategoryBar />
      <FoodTypes />
      <Filterbar />
      <Ads />
    </div>
  );
}

export default App;
