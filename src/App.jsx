import { useState } from "react";
import Navbar from "./components/Navbar";
import CategoryBar from "./components/CategoryBar";
import FoodTypes from "./components/FoodTypes";
import Filterbar from "./components/Filterbar";
import Ads from "./components/Ads";
import Recomendation from "./components/Recomendation";

function App() {
  return (
    <div>
      <Navbar />
      <CategoryBar />
      <FoodTypes />
      <Filterbar />
      <Ads />
      <Recomendation />
    </div>
  );
}

export default App;
