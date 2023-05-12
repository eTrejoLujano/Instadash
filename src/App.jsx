import { useState } from "react";
import Navbar from "./components/Navbar";
import CategoryBar from "./components/CategoryBar";
import FoodTypes from "./components/FoodTypes";
import Filterbar from "./components/Filterbar";
import Ads from "./components/Ads";
import National from "./components/National";
import Fastest from "./components/Fastest";
import Breakfast from "./components/Breakfast";
import Convenience from "./components/Convenience";
import Grocery from "./components/Grocery";

function App() {
  return (
    <div>
      <Navbar />
      <CategoryBar />
      <FoodTypes />
      <Filterbar />
      <Ads />
      <National />
      <Fastest />
      <Breakfast />
      <Convenience />
      <Grocery />
    </div>
  );
}

export default App;
